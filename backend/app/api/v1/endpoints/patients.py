from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.modules.profile.service import profile_service

router = APIRouter()


class PatientCreate(BaseModel):
    phone_number: str
    name: str

    age: Optional[int] = None
    gender: Optional[str] = None
    blood_type: Optional[str] = None

    allergies: Optional[str] = None
    chronic_diseases: Optional[str] = None
    medications: Optional[str] = None

    height: Optional[float] = None
    weight: Optional[float] = None


@router.get("")
def get_patients():
    return profile_service.get_all_profiles()


@router.post("")
def create_patient(patient: PatientCreate):

    try:
        return profile_service.create_patient(
            **patient.model_dump()
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
    
@router.delete("/{phone_number}")
def delete_patient(
    phone_number: str,
):

    return profile_service.delete_patient(
        phone_number,
    )