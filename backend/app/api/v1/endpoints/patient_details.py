from fastapi import APIRouter

from app.modules.patient_details.service import (
    patient_details_service,
)

router = APIRouter()


@router.get("/{phone_number}")
def get_patient_details(
    phone_number: str,
):
    return patient_details_service.get_patient(
        phone_number,
    )