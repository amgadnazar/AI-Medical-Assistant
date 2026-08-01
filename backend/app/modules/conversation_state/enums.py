from enum import Enum


class ConversationState(str, Enum):
    IDLE = "idle"

    WAITING_FOR_PATIENT_NAME = "waiting_for_patient_name"

    WAITING_FOR_DOCTOR = "waiting_for_doctor"

    WAITING_FOR_DATE = "waiting_for_date"

    WAITING_FOR_TIME = "waiting_for_time"

    WAITING_FOR_CONFIRMATION = "waiting_for_confirmation"

    BOOKING_COMPLETED = "booking_completed"

    WAITING_FOR_CANCELLATION_CONFIRMATION = (
        "waiting_for_cancellation_confirmation"
    )

    WAITING_FOR_RESCHEDULE_DATE = "waiting_for_reschedule_date"

    WAITING_FOR_RESCHEDULE_TIME = "waiting_for_reschedule_time"