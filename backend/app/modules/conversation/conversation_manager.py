from app.modules.database.service import database_service


class ConversationManager:

    # ==========================
    # Save User Message
    # ==========================

    def save_user_message(
        self,
        phone_number: str,
        message: str,
    ):

        database_service.save_message(
            phone_number=phone_number,
            role="user",
            message=message,
        )

    # ==========================
    # Save Assistant Message
    # ==========================

    def save_assistant_message(
        self,
        phone_number: str,
        message: str,
    ):

        database_service.save_message(
            phone_number=phone_number,
            role="assistant",
            message=message,
        )

    # ==========================
    # Conversation History
    # ==========================

    def get_history(
        self,
        phone_number: str,
        limit: int = 10,
    ):

        return database_service.get_conversation(
            phone_number=phone_number,
            limit=limit,
        )

    # ==========================
    # Clear Conversation
    # ==========================

    def clear_history(
        self,
        phone_number: str,
    ):

        return database_service.clear_conversation(
            phone_number=phone_number,
        )


conversation_manager = ConversationManager()