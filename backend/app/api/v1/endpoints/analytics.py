from fastapi import APIRouter

from app.modules.analytics.service import analytics_service
from app.modules.appointments.service import appointment_service
router = APIRouter()


@router.get("/appointment-status")
def appointment_status():

    return analytics_service.get_appointment_status()

@router.get("/doctor-bookings")
def doctor_bookings():

    return appointment_service.get_doctors_statistics()

@router.get("/appointments-trend")
def appointments_trend():

    return appointment_service.get_appointments_trend()