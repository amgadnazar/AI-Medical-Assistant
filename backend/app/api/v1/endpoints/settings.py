from fastapi import APIRouter, Body

from app.modules.settings.service import settings_service

router = APIRouter()


# =====================================================
# Get General Settings
# =====================================================

@router.get("/")
def get_settings():
    return settings_service.get_settings()


# =====================================================
# Update General Settings
# =====================================================

@router.put("/")
def update_settings(
    data: dict = Body(...),
):
    return settings_service.update_settings(data)