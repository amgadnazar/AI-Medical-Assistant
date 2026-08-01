from app.modules.whatsapp.buttons import buttons


class WhatsAppMenu:

    def main_menu(
        self,
        name: str | None = None,
    ) -> dict:

        if name:

            body = (
                f"👋 أهلاً {name}\n\n"
                "مرحباً بك في مجمع عيادات مكة الطبية.\n\n"
                "اختر إحدى الخدمات التالية:"
            )

        else:

            body = (
                "👋 أهلاً بك\n\n"
                "مرحباً بك في مجمع عيادات مكة الطبية.\n\n"
                "اختر إحدى الخدمات التالية:"
            )

        return {
            "body": body,
            "buttons": [
                {
                    "id": buttons.DOCTORS,
                    "title": "👨‍⚕️ الأطباء",
                },
                {
                    "id": buttons.BOOK_APPOINTMENT,
                    "title": "📅 الحجز",
                },
                {
                    "id": buttons.CLINIC_INFO,
                    "title": "🏥 العيادة",
                },
            ],
        }


menu = WhatsAppMenu()