from fastapi import APIRouter

from app.modules.clinic.service import clinic_service
from app.modules.clinic.schemas import ClinicSettingsUpdate

router = APIRouter(
    prefix="/clinic",
    tags=["Clinic"],
)


@router.get("/settings")
def get_clinic_settings():
    return clinic_service.get_clinic()


@router.put("/settings")
def update_clinic_settings(
    data: ClinicSettingsUpdate,
):
    return clinic_service.update_clinic(
        data.model_dump()
    )