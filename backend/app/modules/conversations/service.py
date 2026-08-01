from app.modules.conversations.repository import (
    conversations_repository,
)


class ConversationsService:

    def get_conversations(self):

        return conversations_repository.get_conversations()

    def get_messages(
        self,
        phone_number: str,
    ):

        return conversations_repository.get_messages(
            phone_number,
        )

    def delete_conversation(
        self,
        phone_number: str,
    ):

        return conversations_repository.delete_conversation(
            phone_number,
        )

conversations_service = ConversationsService()