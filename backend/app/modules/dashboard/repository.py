from datetime import date

from app.modules.database.client import supabase_client


class DashboardRepository:

    @property
    def db(self):
        return supabase_client.client

    # ==========================
    # Patients
    # ==========================

    def patients_count(self):

        result = (
            self.db
            .table("user_profiles")
            .select("*", count="exact")
            .execute()
        )

        return result.count or 0

    # ==========================
    # Doctors
    # ==========================

    def doctors_count(self):

        result = (
            self.db
            .table("doctors")
            .select("*", count="exact")
            .execute()
        )

        return result.count or 0

    # ==========================
    # Appointments
    # ==========================

    def appointments_count(self):

        result = (
            self.db
            .table("appointments")
            .select("*", count="exact")
            .execute()
        )

        return result.count or 0

    # ==========================
    # Today's Appointments
    # ==========================

    def today_appointments(self):

        today = str(date.today())

        result = (
            self.db
            .table("appointments")
            .select("*", count="exact")
            .eq("appointment_date", today)
            .execute()
        )

        return result.count or 0

    # ==========================
    # Messages
    # ==========================

    def conversations_count(self):

        result = (
            self.db
            .table("conversations")
            .select("*", count="exact")
            .execute()
        )

        return result.count or 0


dashboard_repository = DashboardRepository()