from app.modules.conversation_state.enums import ConversationState
from app.modules.conversation_state.service import (
    conversation_state_service,
)

from app.modules.intent.classifier import intent_classifier
from app.modules.intent.doctor_intent import doctor_intent
from app.modules.intent.enums import Intent


class IntentService:

    def handle(
        self,
        phone_number: str,
        message: str,
    ) -> str | None:

        session = conversation_state_service.get(
            phone_number,
        )

        # =====================================================
        # إذا المستخدم اختار طبيب بالفعل ثم قال:
        # نعم / احجز / موافق ...
        # نبدأ الحجز مباشرة بدون الاعتماد على الـ classifier
        # =====================================================

        doctor_name = session.data.get(
            "doctor_name",
        )

        if doctor_name:

            booking_words = [
                "نعم",
                "ايوه",
                "أيوا",
                "ايوا",
                "اجل",
                "أكيد",
                "اكيد",
                "موافق",
                "تمام",
                "احجز",
                "احجزه",
                "احجز لي",
                "ابدأ",
                "ابدء",
            ]

            text = message.strip().lower()

            if any(word in text for word in booking_words):

                conversation_state_service.set_state(
                    phone_number,
                    ConversationState.WAITING_FOR_PATIENT_NAME,
                )

                return (
                    f"ممتاز ✅\n\n"
                    f"سيتم الحجز مع {doctor_name}.\n\n"
                    "ما الاسم الذي سيتم تسجيل الموعد به؟"
                )

        # =====================================================
        # Intent Classifier
        # =====================================================

        intent = intent_classifier.classify(
            message,
        )

        print("INTENT =", intent)

        # =====================================================
        # Doctor Search
        # =====================================================

        if intent == Intent.DOCTOR_SEARCH:

            return doctor_intent.handle(
                phone_number=phone_number,
                message=message,
            )

        # =====================================================
        # Booking Intent
        # =====================================================

        if intent == Intent.BOOK_APPOINTMENT:

            doctor_name = session.data.get(
                "doctor_name",
            )

            if not doctor_name:

                return (
                    "من فضلك اختر الطبيب أولاً.\n\n"
                    "مثال:\n"
                    "أريد طبيب قلب"
                )

            conversation_state_service.set_state(
                phone_number,
                ConversationState.WAITING_FOR_PATIENT_NAME,
            )

            return (
                f"ممتاز ✅\n\n"
                f"سيتم الحجز مع {doctor_name}.\n\n"
                "ما الاسم الذي سيتم تسجيل الموعد به؟"
            )

        return None


intent_service = IntentService()