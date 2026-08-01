from app.modules.rag.client import chroma_client
from app.modules.rag.embeddings import embeddings


class SearchEngine:

    def search(
        self,
        query: str,
        top_k: int = 10,
    ) -> list:

        # ==========================
        # Embed Query
        # ==========================

        query_embedding = embeddings.embed_query(
            query,
        )

        # ==========================
        # Search ChromaDB
        # ==========================

        results = chroma_client.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            include=[
                "documents",
                "distances",
                "metadatas",
            ],
        )

        documents = results["documents"][0]
        distances = results["distances"][0]
        metadatas = results["metadatas"][0]

        search_results = []

        # ==========================
        # Normalize Results
        # ==========================

        for document, distance, metadata in zip(
            documents,
            distances,
            metadatas,
        ):

            search_results.append(
                {
                    "document": document,
                    "distance": distance,
                    "score": 1 - distance,
                    "metadata": metadata,
                }
            )

        return search_results


search_engine = SearchEngine()