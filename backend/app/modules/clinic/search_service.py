from app.modules.clinic.repository import clinic_repository


class ClinicSearchService:

    def find_department(
        self,
        text: str,
    ):

        departments = clinic_repository.get_departments()

        text = text.lower()

        for department in departments:

            if department["name"] in text:
                return department

        return None

    def is_doctor_question(
        self,
        text: str,
    ):

        text = text.lower()

        keywords = [
            "دكتور",
            "طبيب",
            "doctor",
        ]

        return any(
            word in text
            for word in keywords
        )

    def is_price_question(
        self,
        text: str,
    ):

        text = text.lower()

        keywords = [
            "سعر",
            "تكلفة",
            "رسوم",
            "كم",
            "price",
        ]

        return any(
            word in text
            for word in keywords
        )


clinic_search_service = ClinicSearchService()