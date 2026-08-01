from app.modules.patient_details.repository import (
    patient_details_repository,
)


class PatientDetailsService:

    def get_patient(
        self,
        phone_number: str,
    ):

        return patient_details_repository.get_patient(
            phone_number,
        )


patient_details_service = PatientDetailsService()