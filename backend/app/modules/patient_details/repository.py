from app.modules.database.client import supabase_client


class PatientDetailsRepository:

    @property
    def db(self):
        return supabase_client.client

    def get_patient(
        self,
        phone_number: str,
    ):

        profile = (
            self.db
            .table("user_profiles")
            .select("*")
            .eq(
                "phone_number",
                phone_number,
            )
            .limit(1)
            .execute()
        )

        appointments = (
            self.db
            .table("appointments")
            .select(
                """
                id,
                appointment_date,
                appointment_time,
                status,
                doctors(
                    full_name
                )
                """
            )
            .eq(
                "patient_phone",
                phone_number,
            )
            .order(
                "appointment_date",
                desc=True,
            )
            .execute()
        )

        conversations = (
            self.db
            .table("conversations")
            .select(
                "role,message,created_at"
            )
            .eq(
                "phone_number",
                phone_number,
            )
            .order(
                "created_at",
                desc=True,
            )
            .limit(20)
            .execute()
        )

        return {
            "profile": profile.data[0] if profile.data else None,
            "appointments": appointments.data or [],
            "conversations": conversations.data or [],
        }


patient_details_repository = PatientDetailsRepository()