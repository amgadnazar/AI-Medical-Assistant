from fastapi import APIRouter

from app.modules.appointments.service import appointment_service

router = APIRouter()


# =====================================================
# Get All Appointments
# =====================================================

@router.get("/")
def get_all_appointments():

    return appointment_service.get_all()


# =====================================================
# Confirm Appointment
# =====================================================

@router.put("/{appointment_id}/confirm")
def confirm_appointment(
    appointment_id: int,
):

    return {
        "success": appointment_service.confirm(
            appointment_id,
        )
    }


# =====================================================
# Complete Appointment
# =====================================================

@router.put("/{appointment_id}/complete")
def complete_appointment(
    appointment_id: int,
):

    return {
        "success": appointment_service.complete(
            appointment_id,
        )
    }


# =====================================================
# Cancel Appointment
# =====================================================

@router.put("/{appointment_id}/cancel")
def cancel_appointment(
    appointment_id: int,
):

    return {
        "success": appointment_service.cancel(
            appointment_id,
        )
    }