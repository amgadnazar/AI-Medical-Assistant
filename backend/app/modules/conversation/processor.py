from app.modules.conversation.assistant_manager import assistant_manager
from app.modules.conversation.conversation_manager import (
    conversation_manager,
)
from app.modules.conversation.profile_manager import profile_manager
from app.modules.conversation_state.enums import ConversationState
from app.modules.conversation_state.service import (
    conversation_state_service,
)
from app.modules.intent.service import intent_service
from app.modules.appointments.service import appointment_service


class ConversationProcessor:

    async def process(
        self,
        phone_number: str,
        message: str,
    ) -> str:

        # ==========================
        # Ensure Profile Exists
        # ==========================

        profile_manager.create_if_not_exists(
            phone_number,
        )

        # ==========================
        # Save User Message
        # ==========================

        conversation_manager.save_user_message(
            phone_number,
            message,
        )

        # ==========================
        # Conversation State
        # ==========================

        session = conversation_state_service.get(
            phone_number,
        )

        print("=" * 80)
        print("CURRENT STATE :", session.state)
        print("SESSION DATA  :", session.data)
        print("=" * 80)

        # ----------------------------------------------------
        # Waiting for patient name
        # ----------------------------------------------------

        if session.state == ConversationState.WAITING_FOR_PATIENT_NAME:

            patient_name = message.strip()

            conversation_state_service.update_data(
                phone_number,
                patient_name=patient_name,
            )

            profile_manager.update(
                phone_number,
                {
                    "name": patient_name,
                },
            )

            conversation_state_service.set_state(
                phone_number,
                ConversationState.WAITING_FOR_DATE,
            )

            reply = (
                f"شكراً لك يا {patient_name}.\n\n"
                "ما اليوم المناسب للحجز؟\n\n"
                "مثال:\n"
                "اليوم\n"
                "غداً\n"
                "الأحد"
            )

            conversation_manager.save_assistant_message(
                phone_number,
                reply,
            )

            return reply

        # ----------------------------------------------------
        # Waiting for date
        # ----------------------------------------------------

        if session.state == ConversationState.WAITING_FOR_DATE:

            appointment_date = (
                message
                .replace("نعم", "")
                .replace("أيوة", "")
                .replace("ايوة", "")
                .replace("تمام", "")
                .replace("اوكي", "")
                .strip()
            )

            try:

                parsed_date = appointment_service.parse_date(
                    appointment_date,
                )

            except ValueError as e:

                reply = f"❌ {e}"

                conversation_manager.save_assistant_message(
                    phone_number,
                    reply,
                )

                return reply

            conversation_state_service.update_data(
                phone_number,
                appointment_date=parsed_date,
            )

            try:

                available_times = (
                    appointment_service.get_available_times(
                        doctor_id=session.data["doctor_id"],
                        appointment_date=parsed_date,
                    )
                )

            except ValueError as e:

                reply = f"❌ {e}"

                conversation_manager.save_assistant_message(
                    phone_number,
                    reply,
                )

                return reply

            if not available_times:

                conversation_state_service.set_state(
                    phone_number,
                    ConversationState.WAITING_FOR_DATE,
                )

                reply = (
                    "❌ لا توجد مواعيد متاحة في هذا اليوم.\n\n"
                    "يرجى اختيار يوم آخر."
                )

                conversation_manager.save_assistant_message(
                    phone_number,
                    reply,
                )

                return reply

            conversation_state_service.set_state(
                phone_number,
                ConversationState.WAITING_FOR_TIME,
            )

            reply = (
                "🕒 الأوقات المتاحة:\n\n"
                + "\n".join(
                    f"• {time}"
                    for time in available_times
                )
                + "\n\n"
                "اكتب الوقت المناسب."
            )

            conversation_manager.save_assistant_message(
                phone_number,
                reply,
            )

            return reply
        # ----------------------------------------------------
        # Waiting for time
        # ----------------------------------------------------

        if session.state == ConversationState.WAITING_FOR_TIME:

            try:

                appointment = appointment_service.create(

                    patient_phone=phone_number,

                    patient_name=session.data["patient_name"],

                    doctor_id=session.data["doctor_id"],

                    appointment_date=session.data["appointment_date"],

                    appointment_time=message.strip(),

                    notes=None,

                )

            except ValueError as e:

                reply = (
                    f"❌ {e}\n\n"
                    "يرجى اختيار وقت آخر.\n\n"
                    "مثال:\n"
                    "5 مساءً\n"
                    "10:30 صباحاً"
                )

                conversation_manager.save_assistant_message(
                    phone_number,
                    reply,
                )

                return reply

            except Exception as e:

                print("=" * 80)
                print("APPOINTMENT ERROR")
                print(e)
                print("=" * 80)

                raise

            conversation_state_service.reset(
                phone_number,
            )

            reply = (
                "✅ تم حجز الموعد بنجاح.\n\n"
                f"🆔 رقم الموعد: {appointment['id']}\n"
                f"👤 الاسم: {appointment['patient_name']}\n"
                f"👨‍⚕️ الطبيب: {session.data['doctor_name']}\n"
                f"📅 التاريخ: {appointment['appointment_date']}\n"
                f"🕒 الوقت: {appointment['appointment_time']}\n\n"
                "بانتظار تأكيد العيادة."
            )

            conversation_manager.save_assistant_message(
                phone_number,
                reply,
            )

            return reply
        # ==========================
        # Intent Engine
        # ==========================

        print("=" * 70)
        print("BEFORE INTENT")

        intent_reply = intent_service.handle(
            phone_number=phone_number,
            message=message,
        )

        print("INTENT_REPLY =", intent_reply)
        print("=" * 70)

        if intent_reply:

            conversation_manager.save_assistant_message(
                phone_number,
                intent_reply,
            )

            return intent_reply

        # ==========================
        # Conversation History
        # ==========================

        history = conversation_manager.get_history(
            phone_number,
        )

        # ==========================
        # AI
        # ==========================

        result = await assistant_manager.generate_reply(
            phone_number=phone_number,
            message=message,
            history=history,
            conversation_state=session.state.value,
        )

        reply = result["reply"]

        profile_manager.update(
            phone_number,
            result["profile_updates"],
        )

        conversation_manager.save_assistant_message(
            phone_number,
            reply,
        )

        return reply


conversation_processor = ConversationProcessor()