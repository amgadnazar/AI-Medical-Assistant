from fastapi import APIRouter

from app.modules.appointments.service import appointment_service
from app.modules.clinic.repository import clinic_repository
from app.modules.database.service import database_service
from app.modules.profile.service import profile_service

router = APIRouter()


@router.get("/stats")
def get_dashboard_stats():

    return {
        "patients": profile_service.get_total_patients(),
        "doctors": clinic_repository.get_doctors_count(),
        "appointments": appointment_service.get_total_appointments(),
        "todayAppointments": appointment_service.get_today_appointments(),
        "messages": database_service.get_messages_count(),
    }

@router.get("/recent-conversations")
def get_recent_conversations():

    return database_service.get_recent_conversations()

@router.get("/patients-growth")
def get_patients_growth():

    return profile_service.get_patients_growth()

@router.get("/today-appointments")
def get_today_appointments():

    return appointment_service.get_today_schedule()

@router.get("/patients")
def get_patients():
    return profile_service.get_all_profiles()

@router.get("/doctors")
def get_doctors():

    return clinic_repository.get_doctors()

@router.get("/conversations")
def get_conversations():

    return database_service.get_conversations()