from app.modules.rag.context_builder import context_builder
from app.modules.rag.search_engine import search_engine
from app.modules.rag.ingest import ingest
from app.modules.rag.client import chroma_client
from app.modules.rag.search_result_filter import (
    search_result_filter,
)


class RAGService:

    def search(
        self,
        query: str,
    ) -> str:

        # ==========================
        # Retrieve
        # ==========================

        results = search_engine.search(
            query=query,
        )

        # ==========================
        # Filter
        # ==========================

        results = search_result_filter.filter(
            results,
        )

        # ==========================
        # Build Context
        # ==========================

        return context_builder.build(
            results,
        )
    
    # =====================================
    # Rebuild Knowledge Base
    # =====================================

    def rebuild(self):

        try:

            self._clear_collection()

            ingest()

            return {
                "success": True,
                "message": "Knowledge Base rebuilt successfully",
            }

        except Exception as e:

            return {
                "success": False,
                "error": str(e),
            }

    def _clear_collection(self):

        chroma_client.client.delete_collection(
            "medical_knowledge",
        )

        chroma_client.collection = (
            chroma_client.client.get_or_create_collection(
                name="medical_knowledge",
            )
        )

        import app.modules.rag.ingest as ingest_module

        ingest_module.collection = (
            chroma_client.collection
        )


rag_service = RAGService()