from app.modules.knowledge.repository import (
    knowledge_repository,
)


class KnowledgeService:

    def get_files(self):
        return knowledge_repository.get_files()

    def delete_file(
        self,
        filename: str,
    ):
        return knowledge_repository.delete_file(filename)
    
knowledge_service = KnowledgeService()