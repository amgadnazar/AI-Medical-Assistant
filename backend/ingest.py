from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.modules.rag.cleaner import cleaner
from app.modules.rag.client import chroma_client
from app.modules.rag.embeddings import embeddings

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

        for doc in documents:
            doc.page_content = cleaner.clean(
                doc.page_content,
            )

        chunks = splitter.split_documents(
            documents,
        )

        print(f"{len(chunks)} chunks")

        texts = [
            chunk.page_content
            for chunk in chunks
        ]

        print("Generating embeddings...")

        vectors = embeddings.embed_documents(
            texts,
        )

        print("Saving to ChromaDB...")

        for chunk, vector in zip(
            chunks,
            vectors,
        ):

            chroma_client.collection.add(
                ids=[str(chunk_id)],
                documents=[chunk.page_content],
                embeddings=[vector],
                metadatas=[
                    {
                        "source": pdf.name,
                        "page": chunk.metadata.get(
                            "page",
                            0,
                        ),
                    }
                ],
            )

            chunk_id += 1

    print("\nKnowledge Base Created Successfully!")


if __name__ == "__main__":
    ingest()