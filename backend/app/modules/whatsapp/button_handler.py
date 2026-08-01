from app.modules.whatsapp.buttons import buttons
from app.modules.clinic.repository import clinic_repository


class ButtonHandler:

    def handle(
        self,
        phone_number: str,
        button_id: str,
    ) -> str:

        # ==========================
        # الأطباء
        # ==========================

        if button_id == buttons.DOCTORS:

            doctors = clinic_repository.get_doctors()

            if not doctors:
                return "لا يوجد أطباء مسجلون حالياً."

            reply = "👨‍⚕️ الأطباء المتوفرون:\n\n"

            for doctor in doctors:

                reply += (
                    f"• {doctor.get('full_name')}\n"
                    f"{doctor.get('title')}\n"
                    f"💰 سعر الكشف: {doctor.get('consultation_price')} ريال\n"
                    f"🕒 {doctor.get('start_time')} - {doctor.get('end_time')}\n\n"
                )

            return reply.strip()

        # ==========================
        # الحجز
        # ==========================

        elif button_id == buttons.BOOK_APPOINTMENT:

            return (
                "📅 حجز موعد\n\n"
                "اكتب اسم الطبيب أو التخصص الذي ترغب بالحجز لديه.\n\n"
                "مثال:\n"
                "• أريد حجز موعد مع د. فهد الزهراني\n"
                "• أريد طبيب قلب"
            )

        # ==========================
        # معلومات العيادة
        # ==========================

        elif button_id == buttons.CLINIC_INFO:

            clinic = clinic_repository.get_clinic()

            if not clinic:
                return "لا توجد معلومات عن العيادة حالياً."

            return (
                f"🏥 {clinic.get('name')}\n\n"
                f"📍 العنوان: {clinic.get('address')}\n"
                f"📞 الهاتف: {clinic.get('phone')}\n"
                f"🕒 ساعات العمل: {clinic.get('working_hours')}"
            )

        return "الخيار غير معروف."


button_handler = ButtonHandler()