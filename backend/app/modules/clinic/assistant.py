from app.modules.clinic.response_builder import (
    clinic_response_builder,
)
from app.modules.clinic.search_service import (
    clinic_search_service,
)


class ClinicAssistant:

    def answer(
        self,
        message: str,
    ):

        department = (
            clinic_search_service.find_department(
                message,
            )
        )

        if not department:
            return None

        if clinic_search_service.is_doctor_question(
            message,
        ):

            return clinic_response_builder.doctors(
                department["id"],
            )

        return None


clinic_assistant = ClinicAssistant()