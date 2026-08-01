from fastapi import APIRouter

from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.dashboard import router as dashboard_router
from app.api.v1.endpoints.patients import router as patients_router
from app.api.v1.endpoints.analytics import router as analytics_router
from app.api.v1.endpoints.appointments import router as appointments_router
from app.api.v1.endpoints.conversations import router as conversations_router
from app.api.v1.endpoints.patient_details import router as patient_details_router
from app.api.v1.endpoints.knowledge import router as knowledge_router
from app.api.v1.endpoints.settings import router as settings_router
from app.api.v1.endpoints.clinic import router as clinic_router
from app.api.v1.endpoints.whatsapp_settings import (
    router as whatsapp_settings_router,
)
from app.api.v1.endpoints.ai import (
    router as ai_router,
)

from app.modules.whatsapp.router import router as whatsapp_router
from app.api.v1.endpoints import database

api_router = APIRouter()

api_router.include_router(
    health_router,
    prefix="/health",
    tags=["Health"],
)

api_router.include_router(
    whatsapp_router,
    prefix="/webhooks/whatsapp",
    tags=["WhatsApp"],
)

api_router.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"],
)

api_router.include_router(
    patients_router,
    prefix="/patients",
    tags=["Patients"],
)

api_router.include_router(
    analytics_router,
    prefix="/analytics",
    tags=["Analytics"],
)

api_router.include_router(
    appointments_router,
    prefix="/appointments",
    tags=["Appointments"],
)

api_router.include_router(
    conversations_router,
    prefix="/conversations",
    tags=["Conversations"],
)

api_router.include_router(
    patient_details_router,
    prefix="/patient-details",
    tags=["Patient Details"],
)

api_router.include_router(
    knowledge_router,
    prefix="/knowledge",
    tags=["Knowledge"],
)

api_router.include_router(
    settings_router,
    prefix="/settings",
    tags=["Settings"],
)

api_router.include_router(
    clinic_router,
    prefix="/clinic",
    tags=["Clinic"],
)

api_router.include_router(
    whatsapp_settings_router,
    prefix="/whatsapp",
    tags=["WhatsApp Settings"],
)

api_router.include_router(
    ai_router,
    prefix="/ai",
    tags=["AI"],
)

api_router.include_router(
    database.router,
    prefix="/database",
    tags=["Database"],
)