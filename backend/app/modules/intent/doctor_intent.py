import re

from app.modules.clinic.repository import clinic_repository
from app.modules.conversation_state.service import (
    conversation_state_service,
)


class DoctorIntent:

    def _doctor_name(
        self,
        doctor: dict,
    ) -> str:

        return doctor.get("full_name", "")

    def _doctor_specialty(
        self,
        doctor: dict,
    ) -> str:

        return doctor.get("title", "")

    def _normalize(
        self,
        text: str,
    ) -> str:

        text = text.lower()

        replacements = {
            "أ": "ا",
            "إ": "ا",
            "آ": "ا",
            "ة": "ه",
            "ى": "ي",
            "ؤ": "و",
            "ئ": "ي",
        }

        for old, new in replacements.items():
            text = text.replace(old, new)

        text = re.sub(r"\s+", " ", text)

        return text.strip()

    def handle(
        self,
        phone_number: str,
        message: str,
    ) -> str | None:

        print("=" * 80)
        print("DOCTOR INTENT EXECUTED")
        print("=" * 80)

        doctors = clinic_repository.get_doctors()

        print("DOCTORS =", len(doctors))

        if not doctors:
            return "لا يوجد أطباء مسجلون حالياً."

        text = message

        for word in [
            "الدكتور",
            "دكتور",
            "دكتورة",
            "طبيب",
            "د.",
            "كشف",
            "سعر",
            "كم",
            "موعد",
            "احجز",
            "حجز",
            "مع",
            "لدى",
            "عند",
            "اريد",
            "أريد",
            "ابغى",
            "ابي",
            "؟",
            "?",
        ]:
            text = text.replace(word, "")

        text = self._normalize(text)

        print("TEXT =", repr(text))

        # =====================================================
        # Show all doctors
        # =====================================================

        general_questions = [
            "من الأطباء",
            "من الاطباء",
            "الأطباء",
            "الاطباء",
            "الدكاترة",
            "الدكاتره",
            "مين عندكم",
            "من عندكم",
        ]

        if any(q in message for q in general_questions):

            reply = "👨‍⚕️ الأطباء الموجودون لدينا:\n\n"

            for doctor in doctors:

                reply += (
                    f"• {self._doctor_name(doctor)}\n"
                    f"{self._doctor_specialty(doctor)}\n"
                    f"💰 {doctor.get('consultation_price')} ريال\n\n"
                )

            return reply.strip()

        # =====================================================
        # Search by doctor name
        # =====================================================

        for doctor in doctors:

            doctor_name = self._normalize(
                self._doctor_name(doctor)
            )

            doctor_name = (
                doctor_name
                .replace("الدكتور", "")
                .replace("دكتور", "")
                .replace("د.", "")
                .strip()
            )

            if doctor_name and (
                doctor_name in text
                or text in doctor_name
            ):

                conversation_state_service.update_data(
                    phone_number,
                    doctor_id=doctor["id"],
                    doctor_name=self._doctor_name(doctor),
                )

                return (
                    f"👨‍⚕️ {self._doctor_name(doctor)}\n\n"
                    f"التخصص: {self._doctor_specialty(doctor)}\n"
                    f"💰 سعر الكشف: {doctor.get('consultation_price')} ريال\n"
                    f"🕒 {doctor.get('start_time')} - {doctor.get('end_time')}"
                )

        # =====================================================
        # Search by specialty
        # =====================================================

        matches = []

        for doctor in doctors:

            specialty = self._normalize(
                self._doctor_specialty(doctor)
            )

            print(
                f"SPECIALTY={specialty} TEXT={text}"
            )

            if text in specialty:

                matches.append(doctor)

        print("MATCHES =", len(matches))

        if not matches:

            return None

        # =====================================================
        # Save first doctor
        # =====================================================

        doctor = matches[0]

        conversation_state_service.update_data(
            phone_number,
            doctor_id=doctor["id"],
            doctor_name=self._doctor_name(doctor),
        )

        # =====================================================
        # One doctor
        # =====================================================

        if len(matches) == 1:

            return (
                "👨‍⚕️ تم العثور على الطبيب:\n\n"
                f"{self._doctor_name(doctor)}\n"
                f"{self._doctor_specialty(doctor)}\n"
                f"💰 سعر الكشف: {doctor.get('consultation_price')} ريال\n"
                f"🕒 {doctor.get('start_time')} - {doctor.get('end_time')}\n\n"
                "هل ترغب في حجز موعد معه؟"
            )

        # =====================================================
        # Multiple doctors
        # =====================================================

        reply = "👨‍⚕️ الأطباء المتوفرون:\n\n"

        for doctor in matches:

            reply += (
                f"• {self._doctor_name(doctor)}\n"
                f"{self._doctor_specialty(doctor)}\n"
                f"💰 {doctor.get('consultation_price')} ريال\n\n"
            )

        reply += "اكتب اسم الطبيب الذي ترغب بالحجز لديه."

        return reply.strip()


doctor_intent = DoctorIntent()