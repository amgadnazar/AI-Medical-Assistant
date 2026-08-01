from dataclasses import dataclass
from datetime import date
from datetime import time


@dataclass
class Appointment:

    patient_phone: str

    patient_name: str

    doctor_id: int

    appointment_date: date

    appointment_time: time

    status: str = "pending"

    notes: str | None = None