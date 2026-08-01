from fastapi import APIRouter, Body

from app.modules.clinic.service import clinic_service

router = APIRouter()


# =====================================================
# Clinic
# =====================================================

@router.get("/")
def get_clinic():
    return clinic_service.get_clinic()


@router.put("/")
def update_clinic(
    data: dict = Body(...),
):
    return clinic_service.update_clinic(data)


# =====================================================
# Branches
# =====================================================

@router.get("/branches")
def get_branches():
    return clinic_service.get_branches()


# =====================================================
# Departments
# =====================================================

@router.get("/departments")
def get_departments():
    return clinic_service.get_departments()


# =====================================================
# Doctors
# =====================================================

@router.get("/doctors")
def get_doctors():
    return clinic_service.get_doctors()


# =====================================================
# Services
# =====================================================

@router.get("/services")
def get_services():
    return clinic_service.get_services()


# =====================================================
# Offers
# =====================================================

@router.get("/offers")
def get_offers():
    return clinic_service.get_offers()