from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.modules.rag.client import collection
from app.modules.rag.embeddings import embeddings
from app.modules.rag.cleaner import cleaner
from app.modules.rag.filter import should_skip


DATA_DIR = Path("knowledge")


def ingest():

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
    )

    pdf_files = list(DATA_DIR.glob("*.pdf"))

    if not pdf_files:
        print("No PDF files found.")
        return

    chunk_id = 0

    for pdf in pdf_files:

        print(f"\nLoading {pdf.name}")

        loader = PyPDFLoader(str(pdf))
        documents = loader.load()

        clean_documents = []
        current_title = "Unknown"

        for doc in documents:

            doc.page_content = cleaner.clean(doc.page_content)

            if should_skip(doc.page_content):
                continue

            lines = doc.page_content.split("\n")

            for line in lines:

                line = line.strip()

                if (
                    len(line) > 5
                    and len(line) < 80
                    and line.isupper()
                ):
                    current_title = line
                    break

            doc.metadata["chapter"] = current_title

            clean_documents.append(doc)

        chunks = splitter.split_documents(clean_documents)

        print(f"{len(chunks)} chunks")

        texts = [chunk.page_content for chunk in chunks]

        print("Generating embeddings...")

        embeddings_list = embeddings.embed_documents(texts)

        print("Saving to ChromaDB...")

        ids = []
        metadatas = []

        for i, chunk in enumerate(chunks):

            ids.append(str(chunk_id + i))

            metadatas.append(
                {
                    "source": pdf.name,
                    "page": chunk.metadata.get("page", 0),
                    "chapter": chunk.metadata.get("chapter", "Unknown"),
                }
            )

        collection.add(
            ids=ids,
            documents=texts,
            embeddings=embeddings_list,
            metadatas=metadatas,
        )

        chunk_id += len(chunks)

    print("\nKnowledge Base Created Successfully!")


if __name__ == "__main__":
    ingest()