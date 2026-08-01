from app.modules.database.client import supabase_client
from app.modules.appointments.models import Appointment


class AppointmentRepository:

    def __init__(self):

        self.db = supabase_client.client

    # =====================================================
    # Create Appointment
    # =====================================================

    def create(
        self,
        appointment: Appointment,
    ):

        data = {

            "patient_phone": appointment.patient_phone,

            "patient_name": appointment.patient_name,

            "doctor_id": appointment.doctor_id,

            "appointment_date": str(
                appointment.appointment_date,
            ),

            "appointment_time": str(
                appointment.appointment_time,
            ),

            "status": appointment.status,

            "notes": appointment.notes,

        }

        result = (

            self.db

            .table("appointments")

            .insert(data)

            .execute()

        )

        if result.data:

            return result.data[0]

        return None

    # =====================================================
    # Check Existing Appointment
    # =====================================================

    def exists(

        self,

        doctor_id: int,

        appointment_date: str,

        appointment_time: str,

    ):

        result = (

            self.db

            .table("appointments")

            .select("*")

            .eq(
                "doctor_id",
                doctor_id,
            )

            .eq(
                "appointment_date",
                appointment_date,
            )

            .eq(
                "appointment_time",
                appointment_time,
            )

            .neq(
                "status",
                "cancelled",
            )

            .limit(1)

            .execute()

        )

        return bool(result.data)
    # =====================================================
    # Booked Times
    # =====================================================

    def get_booked_times(

        self,

        doctor_id: int,

        appointment_date: str,

    ):

        result = (

            self.db

            .table("appointments")

            .select("appointment_time")

            .eq(
                "doctor_id",
                doctor_id,
            )

            .eq(
                "appointment_date",
                appointment_date,
            )

            .neq(
                "status",
                "cancelled",
            )

            .execute()

        )

        return result.data or []

    # =====================================================
    # Patient Appointments
    # =====================================================

    def get_by_patient(

        self,

        phone_number: str,

    ):

        result = (

            self.db

            .table("appointments")

            .select("*")

            .eq(
                "patient_phone",
                phone_number,
            )

            .order(
                "appointment_date"
            )

            .execute()

        )

        return result.data or []

    # =====================================================
    # Doctor Appointments
    # =====================================================

    def get_by_doctor(

        self,

        doctor_id: int,

    ):

        result = (

            self.db

            .table("appointments")

            .select("*")

            .eq(
                "doctor_id",
                doctor_id,
            )

            .order(
                "appointment_date"
            )

            .execute()

        )

        return result.data or []

    # =====================================================
    # Today's Appointments
    # =====================================================

    def get_today_appointments(self):

        from datetime import date

        result = (
            self.db
            .table("appointments")
            .select(
                """
                id,
                patient_name,
                appointment_time,
                status,
                doctors(
                    full_name
                )
                """
            )
            .eq(
                "appointment_date",
                date.today().isoformat(),
            )
            .order(
                "appointment_time",
            )
            .execute()
        )

        return result.data or []
    
    # =====================================================
    # Get Appointment
    # =====================================================

    def get(

        self,

        appointment_id: int,

    ):

        result = (

            self.db

            .table("appointments")

            .select("*")

            .eq(
                "id",
                appointment_id,
            )

            .limit(1)

            .execute()

        )

        if result.data:

            return result.data[0]

        return None

    # =====================================================
    # Cancel
    # =====================================================

    def cancel(

        self,

        appointment_id: int,

    ):

        result = (

            self.db

            .table("appointments")

            .update(
                {
                    "status": "cancelled",
                }
            )

            .eq(
                "id",
                appointment_id,
            )

            .execute()

        )

        return bool(result.data)

    # =====================================================
    # Latest Appointments
    # =====================================================

    def get_latest(
        self,
        limit: int = 10,
    ):

        result = (
            self.db
            .table("appointments")
            .select(
                """
                id,
                patient_name,
                appointment_date,
                appointment_time,
                status,
                doctor_id,
                doctors(name)
                """
            )
            .order(
                "created_at",
                desc=True,
            )
            .limit(limit)
            .execute()
        )

        return result.data or []

    # =====================================================
    # All Appointments
    # =====================================================

    def get_all(self):

        result = (
            self.db
            .table("appointments")
            .select(
                """
                id,
                patient_name,
                patient_phone,
                appointment_date,
                appointment_time,
                status,
                notes,
                doctors(
                    id,
                    full_name
                )
                """
            )
            .order(
                "appointment_date",
            )
            .order(
                "appointment_time",
            )
            .execute()
        )

        return result.data or []

    # =====================================================
    # Confirm Appointment
    # =====================================================

    def confirm(
        self,
        appointment_id: int,
    ):

        result = (
            self.db
            .table("appointments")
            .update(
                {
                    "status": "confirmed",
                }
            )
            .eq(
                "id",
                appointment_id,
            )
            .execute()
        )

        return bool(result.data)

    # =====================================================
    # Complete Appointment
    # =====================================================

    def complete(
        self,
        appointment_id: int,
    ):

        result = (
            self.db
            .table("appointments")
            .update(
                {
                    "status": "completed",
                }
            )
            .eq(
                "id",
                appointment_id,
            )
            .execute()
        )

        return bool(result.data)

    # =====================================================
    # All Appointments
    # =====================================================

    def get_all(self):

        result = (
            self.db
            .table("appointments")
            .select(
                """
                id,
                patient_name,
                patient_phone,
                appointment_date,
                appointment_time,
                status,
                notes,
                doctors(
                    full_name
                )
                """
            )
            .order(
                "appointment_date",
            )
            .order(
                "appointment_time",
            )
            .execute()
        )

        return result.data or []

    # =====================================================
    # Confirm Appointment
    # =====================================================

    def confirm(
        self,
        appointment_id: int,
    ):

        result = (
            self.db
            .table("appointments")
            .update(
                {
                    "status": "confirmed",
                }
            )
            .eq(
                "id",
                appointment_id,
            )
            .execute()
        )

        return bool(result.data)

    # =====================================================
    # Complete Appointment
    # =====================================================

    def complete(
        self,
        appointment_id: int,
    ):

        result = (
            self.db
            .table("appointments")
            .update(
                {
                    "status": "completed",
                }
            )
            .eq(
                "id",
                appointment_id,
            )
            .execute()
        )

        return bool(result.data)

    # =====================================================
    # Most Booked Doctors
    # =====================================================

    def get_doctors_statistics(self):

        result = (
            self.db
            .table("appointments")
            .select(
                """
                doctor_id,
                doctors(
                    full_name
                )
                """
            )
            .execute()
        )

        stats = {}

        for row in result.data or []:

            doctor = row["doctors"]["full_name"]

            stats[doctor] = stats.get(
                doctor,
                0,
            ) + 1

        return [
            {
                "doctor": k,
                "appointments": v,
            }
            for k, v in stats.items()
        ]    
    # =====================================================
    # Appointments Trend
    # =====================================================

    def get_appointments_trend(self):

        result = (
            self.db
            .table("appointments")
            .select("appointment_date")
            .order("appointment_date")
            .execute()
        )

        trend = {}

        for row in result.data or []:

            day = row["appointment_date"]

            trend[day] = trend.get(day, 0) + 1

        return [
            {
                "date": k,
                "appointments": v,
            }
            for k, v in trend.items()
        ]

    # =====================================================
    # All Appointments
    # =====================================================

    def get_all(self):

        result = (
            self.db
            .table("appointments")
            .select(
                """
                id,
                patient_name,
                patient_phone,
                appointment_date,
                appointment_time,
                status,
                notes,
                doctors(
                    full_name
                )
                """
            )
            .order(
                "appointment_date",
            )
            .execute()
        )

        return result.data or []
appointment_repository = AppointmentRepository()