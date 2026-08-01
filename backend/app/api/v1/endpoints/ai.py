from fastapi import APIRouter, Body

from app.modules.ai.service import ai_service

router = APIRouter()


@router.get("/")
def get_ai_settings():
    return ai_service.get_settings()


@router.put("/")
def update_ai_settings(
    data: dict = Body(...),
):
    return ai_service.update_settings(data)