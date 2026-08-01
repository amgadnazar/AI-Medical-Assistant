from app.modules.database.client import supabase_client


class MessageTrackerRepository:

    @property
    def db(self):
        return supabase_client.client

    def exists(
        self,
        message_id: str,
    ) -> bool:

        response = (
            self.db
            .table("processed_messages")
            .select("message_id")
            .eq("message_id", message_id)
            .limit(1)
            .execute()
        )

        return len(response.data) > 0

    def save(
        self,
        message_id: str,
        phone_number: str,
    ):

        response = (
            self.db
            .table("processed_messages")
            .insert(
                {
                    "message_id": message_id,
                    "phone_number": phone_number,
                }
            )
            .execute()
        )

        return response.data[0]


message_tracker_repository = MessageTrackerRepository()