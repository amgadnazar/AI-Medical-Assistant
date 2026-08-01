from app.modules.dashboard.repository import dashboard_repository


class DashboardService:

    def get_stats(self):

        return {
            "patients": dashboard_repository.patients_count(),
            "doctors": dashboard_repository.doctors_count(),
            "appointments": dashboard_repository.appointments_count(),
            "todayAppointments": dashboard_repository.today_appointments(),
            "messages": dashboard_repository.conversations_count(),
        }


dashboard_service = DashboardService()