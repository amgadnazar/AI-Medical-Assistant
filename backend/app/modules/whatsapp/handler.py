from app.modules.conversation.processor import conversation_processor
from app.modules.profile.service import profile_service
from app.modules.whatsapp.button_handler import button_handler
from app.modules.whatsapp.menu import menu
from app.modules.whatsapp.parsers.message_parser import message_parser
from app.modules.whatsapp.service import whatsapp_service
from app.modules.message_tracker.service import message_tracker_service


class WhatsAppHandler:

    async def handle_message(
        self,
        body: dict,
    ):

        parsed = message_parser.parse(body)

        if not parsed:
            return

        # =====================================================
        # Ignore duplicate webhook events
        # =====================================================

        message_id = parsed.get("id")

        if message_id:

            if message_tracker_service.is_processed(message_id):

                print("=" * 70)
                print("DUPLICATE MESSAGE")
                print(message_id)
                print("=" * 70)

                return

            message_tracker_service.mark_processed(
                message_id=message_id,
                phone_number=parsed["from"],
            )

        sender = parsed["from"]

        # =====================================================
        # Interactive Buttons
        # =====================================================

        if parsed["type"] == "interactive":

            reply = button_handler.handle(
                phone_number=sender,
                button_id=parsed["button_id"],
            )

            try:

                await whatsapp_service.send_text(
                    to=sender,
                    message=reply,
                )

            except Exception as e:

                print("=" * 80)
                print("SEND MESSAGE FAILED")
                print(e)
                print("=" * 80)

            return

        # =====================================================
        # Text Messages
        # =====================================================

        if parsed["type"] != "text":
            return

        user_message = parsed["text"].strip()

        greetings = {
            "سلام",
            "السلام عليكم",
            "مرحبا",
            "اهلا",
            "أهلاً",
            "hi",
            "hello",
            "start",
        }

        if user_message.lower() in greetings:

            profile = profile_service.get_profile(sender)

            data = menu.main_menu(
                profile.get("name") if profile else None,
            )

            await whatsapp_service.send_buttons(
                to=sender,
                body=data["body"],
                buttons=data["buttons"],
            )

            return

        # =====================================================
        # AI Conversation
        # =====================================================

        reply = await conversation_processor.process(
            phone_number=sender,
            message=user_message,
        )

        await whatsapp_service.send_text(
            to=sender,
            message=reply,
        )


whatsapp_handler = WhatsAppHandler()