from app.modules.database.client import supabase_client


class AnalyticsRepository:

    def __init__(self):
        self.db = supabase_client.client

    # ==========================================
    # Appointment Status
    # ==========================================

    def get_appointment_status(self):

        result = (
            self.db
            .table("appointments")
            .select("status")
            .execute()
        )

        appointments = result.data or []

        stats = {
            "pending": 0,
            "confirmed": 0,
            "completed": 0,
            "cancelled": 0,
        }

        for appointment in appointments:

            status = appointment.get("status")

            if status in stats:
                stats[status] += 1

        return [
            {
                "status": status,
                "count": count,
            }
            for status, count in stats.items()
        ]


analytics_repository = AnalyticsRepository()