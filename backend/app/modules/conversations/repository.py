from app.modules.database.client import supabase_client


class ConversationsRepository:

    @property
    def db(self):
        return supabase_client.client

    # =====================================================
    # Conversations List
    # =====================================================

    def get_conversations(self):
        result = (
            self.db
            .table("conversations")
            .select(
                "phone_number, role, message, created_at"
            )
            .order(
                "created_at",
                desc=True,
            )
            .execute()
        )

        conversations = {}

        for row in result.data or []:
            phone = row["phone_number"]

            if phone not in conversations:
                conversations[phone] = row

        return list(conversations.values())

    # =====================================================
    # Conversation Messages
    # =====================================================

    def get_messages(
        self,
        phone_number: str,
    ):
        result = (
            self.db
            .table("conversations")
            .select("*")
            .eq(
                "phone_number",
                phone_number,
            )
            .order(
                "created_at",
            )
            .execute()
        )

        return result.data or []

    # =====================================================
    # Delete Conversation
    # =====================================================

    def delete_conversation(
        self,
        phone_number: str,
    ):
        result = (
            self.db
            .table("conversations")
            .delete()
            .eq(
                "phone_number",
                phone_number,
            )
            .execute()
        )

        return result.data


print(__file__)

conversations_repository = ConversationsRepository()