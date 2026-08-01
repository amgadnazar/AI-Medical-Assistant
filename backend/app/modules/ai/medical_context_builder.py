from app.modules.rag.service import rag_service


class MedicalContextBuilder:

    def build(
        self,
        message: str,
    ) -> str:

        return rag_service.search(
            message,
        )


medical_context_builder = MedicalContextBuilder()