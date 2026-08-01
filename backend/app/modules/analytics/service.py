from app.modules.analytics.repository import analytics_repository


class AnalyticsService:

    def get_appointment_status(self):

        return analytics_repository.get_appointment_status()


analytics_service = AnalyticsService()