from fastapi import APIRouter

from app.modules.database.service import database_service

router = APIRouter()


@router.get("/")
def get_database_info():
    return database_service.get_database_info()