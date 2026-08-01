from app.modules.database.client import supabase_client


class DatabaseService:

    def save_message(
        self,
        phone_number: str,
        role: str,
        message: str,
    ):

        return (
            supabase_client.client
            .table("conversations")
            .insert({
                "phone_number": phone_number,
                "role": role,
                "message": message,
            })
            .execute()
        )

    def get_conversation(
        self,
        phone_number: str,
        limit: int = 10,
    ):

        response = (
            supabase_client.client
            .table("conversations")
            .select("*")
            .eq("phone_number", phone_number)
            .order("created_at",desc=True,)
            .limit(limit)
            .execute()
        )
        response.data.reverse()
        return response.data

    # =====================================================
    # Messages Count
    # =====================================================

    def get_messages_count(self):

        return len(
            supabase_client.client
            .table("conversations")
            .select("id")
            .execute()
            .data
        )
    # =====================================================
    # Recent Conversations
    # =====================================================

    def get_recent_conversations(
        self,
        limit: int = 10,
    ):

        response = (
            supabase_client.client
            .table("conversations")
            .select(
                "phone_number, role, message, created_at"
            )
            .order(
                "created_at",
                desc=True,
            )
            .limit(limit)
            .execute()
        )

        return response.data or []

    # =====================================================
    # Conversations List
    # =====================================================

    def get_conversations(self):

        response = (
            supabase_client.client
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

        for row in response.data or []:
            if row["phone_number"] not in conversations:
                conversations[row["phone_number"]] = row

        return list(conversations.values())
    
    def get_database_info(self):

        return {
            "clinic": len(
                supabase_client.client
                .table("clinics")
                .select("id")
                .execute()
                .data
            ),

            "branches": len(
                supabase_client.client
                .table("branches")
                .select("id")
                .execute()
                .data
            ),

            "departments": len(
                supabase_client.client
                .table("departments")
                .select("id")
                .execute()
                .data
            ),

            "doctors": len(
                supabase_client.client
                .table("doctors")
                .select("id")
                .execute()
                .data
            ),

            "services": len(
                supabase_client.client
                .table("services")
                .select("id")
                .execute()
                .data
            ),

            "offers": len(
                supabase_client.client
                .table("offers")
                .select("id")
                .execute()
                .data
            ),

            "appointments": len(
                supabase_client.client
                .table("appointments")
                .select("id")
                .execute()
                .data
            ),

            "appointment_slots": len(
                supabase_client.client
                .table("appointment_slots")
                .select("id")
                .execute()
                .data
            ),

            "patients": len(
                supabase_client.client
                .table("user_profiles")
                .select("phone_number")
                .execute()
                .data
            ),

            "conversations": len(
                supabase_client.client
                .table("conversations")
                .select("phone_number")
                .execute()
                .data
            ),
        }

database_service = DatabaseService()