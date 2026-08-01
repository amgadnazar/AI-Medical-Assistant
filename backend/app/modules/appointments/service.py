from datetime import date
from datetime import datetime
from datetime import time
from datetime import timedelta

from app.modules.appointments.models import Appointment
from app.modules.appointments.repository import appointment_repository
from app.modules.clinic.repository import clinic_repository

class AppointmentService:

    # =====================================================
    # Date Parser
    # =====================================================

    def parse_date(
        self,
        text: str,
    ) -> date:

        text = text.strip().lower()

        text = " ".join(text.split())

        today = date.today()

        if "اليوم" in text:
            return today

        if "غدا" in text or "غداً" in text:
            return today + timedelta(days=1)
        
        # تنظيف بعض الكلمات الشائعة
        for word in [
            "موعد",
            "الحجز",
            "حجز",
            "القادم",
            "القادمة",
            "في",
            "يكون",
            "اريد",
            "أريد",
        ]:
            text = text.replace(word, " ")



        weekdays = {
            "السبت": 5,
            "الاحد": 6,
            "الأحد": 6,
            "الاثنين": 0,
            "الإثنين": 0,
            "الثلاثاء": 1,
            "الاربعاء": 2,
            "الأربعاء": 2,
            "الخميس": 3,
            "الجمعه": 4,
            "الجمعة": 4,
        }

        

        # البحث عن اسم اليوم داخل الجملة
        for day_name, weekday in weekdays.items():

            if day_name in text:

                days = (
                    weekday - today.weekday()
                ) % 7

                if days == 0:
                    days = 7

                return today + timedelta(
                    days=days,
                )

        # صيغة YYYY-MM-DD
        try:

            return datetime.strptime(
                text,
                "%Y-%m-%d",
            ).date()

        except ValueError:

            pass

        raise ValueError(
            "صيغة التاريخ غير صحيحة."
        )

    # =====================================================
    # Time Parser
    # =====================================================

    def parse_time(
        self,
        text: str,
    ) -> time:

        value = text.strip().lower()

        value = (
            value
            .replace(" ", "")
            .replace("صباحاً", "am")
            .replace("صباحا", "am")
            .replace("صباح", "am")
            .replace("ص", "am")
            .replace("مساءً", "pm")
            .replace("مساء", "pm")
            .replace("م", "pm")
        )

        formats = [
            "%H:%M",
            "%I:%M%p",
            "%I%p",
            "%H",
            "%I",
        ]

        for fmt in formats:

            try:

                parsed = datetime.strptime(
                    value,
                    fmt,
                ).time()

                # إذا كتب المستخدم "5" فقط نفترض أنها 5 مساءً
                if (
                    fmt == "%I"
                    and parsed.hour < 8
                ):
                    parsed = parsed.replace(
                        hour=parsed.hour + 12,
                    )

                return parsed

            except ValueError:

                continue

        raise ValueError(
            "صيغة الوقت غير صحيحة. أمثلة: 10:30، 5 مساءً، 5 PM، 17:00"
        )

    # =====================================================
    # Available Times
    # =====================================================

    def get_available_times(
        self,
        doctor_id: int,
        appointment_date,
    ):

        if isinstance(appointment_date, str):
            appointment_date = self.parse_date(
                appointment_date,
            )

        doctor = clinic_repository.get_doctor_by_id(
            doctor_id,
        )

        if not doctor:
            raise ValueError(
                "الطبيب غير موجود."
            )

        start_time = doctor["start_time"]
        end_time = doctor["end_time"]

        if isinstance(start_time, str):
            start_time = datetime.strptime(
                start_time,
                "%H:%M:%S",
            ).time()

        if isinstance(end_time, str):
            end_time = datetime.strptime(
                end_time,
                "%H:%M:%S",
            ).time()

        booked = appointment_repository.get_booked_times(
            doctor_id,
            str(appointment_date),
        )

        booked_times = {
            row["appointment_time"][:5]
            for row in booked
        }

        available = []

        current = datetime.combine(
            appointment_date,
            start_time,
        )

        end = datetime.combine(
            appointment_date,
            end_time,
        )

        now = datetime.now()

        while current <= end:

            t = current.strftime("%H:%M")

            if (
                t not in booked_times
                and current > now
            ):
                available.append(t)

            current += timedelta(
                hours=1,
            )

        return available

    # =====================================================
    # Create Appointment
    # =====================================================

    def create(

        self,

        patient_phone: str,

        patient_name: str,

        doctor_id: int,

        appointment_date,

        appointment_time,

        notes: str | None = None,

    ):

        if isinstance(
            appointment_date,
            str,
        ):
            appointment_date = self.parse_date(
                appointment_date,
            )

        if isinstance(
            appointment_time,
            str,
        ):
            appointment_time = self.parse_time(
                appointment_time,
            )
            available_slots = self.get_available_slots(
                doctor_id,
                appointment_date,
            )

            selected_slot = appointment_time.strftime("%H:%M")

            if selected_slot not in available_slots:

                slots = "\n".join(
                    f"• {slot}"
                    for slot in available_slots
                )

                raise ValueError(
                    "❌ هذا الوقت غير متاح.\n\n"
                    "🕒 الأوقات المتاحة:\n\n"
                    f"{slots}"
                )
        
        # =====================================================
        # Prevent booking in the past
        # =====================================================

        now = datetime.now()

        appointment_datetime = datetime.combine(
            appointment_date,
            appointment_time,
        )

        if appointment_datetime <= now:

            raise ValueError(
                "❌ لا يمكن حجز موعد في وقت مضى."
            )


        # =====================================================
        # Check Doctor Working Hours
        # =====================================================

        doctor = clinic_repository.get_doctor_by_id(
            doctor_id,
        )

        if doctor:

            start_time = doctor.get("start_time")
            end_time = doctor.get("end_time")

            if isinstance(start_time, str):
                start_time = datetime.strptime(
                    start_time,
                    "%H:%M:%S",
                ).time()

            if isinstance(end_time, str):
                end_time = datetime.strptime(
                    end_time,
                    "%H:%M:%S",
                ).time()

            if (
                appointment_time < start_time
                or appointment_time > end_time
            ):

                raise ValueError(
                    f"هذا الطبيب يعمل من "
                    f"{start_time.strftime('%H:%M')} "
                    f"إلى "
                    f"{end_time.strftime('%H:%M')}."
                )
        exists = appointment_repository.exists(
            doctor_id=doctor_id,
            appointment_date=str(
                appointment_date,
            ),
            appointment_time=str(
                appointment_time,
            ),
        )

        if exists:

            raise ValueError(
                "❌ هذا الموعد محجوز بالفعل، الرجاء اختيار وقت آخر."
            )

        appointment = Appointment(

            patient_phone=patient_phone,

            patient_name=patient_name,

            doctor_id=doctor_id,

            appointment_date=appointment_date,

            appointment_time=appointment_time,

            status="pending",

            notes=notes,

        )

        return appointment_repository.create(
            appointment,
        )

    # =====================================================
    # Patient Appointments
    # =====================================================

    def get_patient_appointments(
        self,
        phone_number: str,
    ):

        return appointment_repository.get_by_patient(
            phone_number,
        )
    
    # =====================================================
    # Doctor Appointments
    # =====================================================

    def get_doctor_appointments(
        self,
        doctor_id: int,
    ):

        return appointment_repository.get_by_doctor(
            doctor_id,
        )
    


    # =====================================================
    # Available Slots
    # =====================================================

    def get_available_slots(
        self,
        doctor_id: int,
        appointment_date,
    ):

        if isinstance(
            appointment_date,
            str,
        ):
            appointment_date = self.parse_date(
                appointment_date,
            )

        doctor = clinic_repository.get_doctor_by_id(
            doctor_id,
        )

        if not doctor:

            return []

        start_time = doctor.get("start_time")
        end_time = doctor.get("end_time")

        if isinstance(start_time, str):

            start_time = datetime.strptime(
                start_time,
                "%H:%M:%S",
            ).time()

        if isinstance(end_time, str):

            end_time = datetime.strptime(
                end_time,
                "%H:%M:%S",
            ).time()

        booked = appointment_repository.get_booked_times(
            doctor_id,
            str(appointment_date),
        )

        booked_times = set()

        for row in booked:

            t = row["appointment_time"]

            if isinstance(t, str):

                t = datetime.strptime(
                    t,
                    "%H:%M:%S",
                ).time()

            booked_times.add(t)

        slots = []

        current = datetime.combine(
            appointment_date,
            start_time,
        )

        end = datetime.combine(
            appointment_date,
            end_time,
        )

        now = datetime.now()

        while current <= end:

            current_time = current.time()

            # تجاهل الأوقات الماضية إذا كان الحجز اليوم
            if (
                appointment_date == date.today()
                and current <= now
            ):
                current += timedelta(
                    hours=1,
                )
                continue

            if current_time not in booked_times:

                slots.append(
                    current_time.strftime(
                        "%H:%M"
                    )
                )

            current += timedelta(
                hours=1,
            )

        return slots

    # =====================================================
    # Cancel Appointment
    # =====================================================

    def cancel(
        self,
        appointment_id: int,
    ):

        return appointment_repository.cancel(
            appointment_id,
        )

    # =====================================================
    # Total Appointments
    # =====================================================

    def get_total_appointments(self):

        return len(
            appointment_repository.db
            .table("appointments")
            .select("id")
            .execute()
            .data
        )

    # =====================================================
    # Today's Appointments
    # =====================================================

    def get_today_appointments(self):

        today = date.today().isoformat()

        return len(
            appointment_repository.db
            .table("appointments")
            .select("id")
            .eq("appointment_date", today)
            .execute()
            .data
        )
    
    # =====================================================
    # Today's Appointments
    # =====================================================

    def get_today_schedule(self):

        return appointment_repository.get_today_appointments()
    
    # =====================================================
    # All Appointments
    # =====================================================

    def get_all(self):

        return appointment_repository.get_all()

    # =====================================================
    # Confirm Appointment
    # =====================================================

    def confirm(
        self,
        appointment_id: int,
    ):

        return appointment_repository.confirm(
            appointment_id,
        )

    # =====================================================
    # Complete Appointment
    # =====================================================

    def complete(
        self,
        appointment_id: int,
    ):

        return appointment_repository.complete(
            appointment_id,
        )
    
    def get_doctors_statistics(self):

        return appointment_repository.get_doctors_statistics()
    
    def get_appointments_trend(self):

        return appointment_repository.get_appointments_trend()
    
    def get_all(self):

        return appointment_repository.get_all()

    # =====================================================
    # Confirm Appointment
    # =====================================================

    def confirm(
        self,
        appointment_id: int,
    ):

        return appointment_repository.confirm(
            appointment_id,
        )


    # =====================================================
    # Complete Appointment
    # =====================================================

    def complete(
        self,
        appointment_id: int,
    ):

        return appointment_repository.complete(
            appointment_id,
        )


    # =====================================================
    # Cancel Appointment
    # =====================================================

    def cancel(
        self,
        appointment_id: int,
    ):

        return appointment_repository.cancel(
            appointment_id,
        )

appointment_service = AppointmentService()