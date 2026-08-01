from app.modules.whatsapp.service import whatsapp_service


class WhatsAppHandler:

    async def handle_message(self, body: dict):

        entry = body["entry"][0]
        change = entry["changes"][0]
        value = change["value"]

        if "messages" not in value:
            return

        message = value["messages"][0]
        sender = message["from"]

        await whatsapp_service.send_text(
            to=sender,
            message="👋 Welcome to AI Medical Assistant",
        )


whatsapp_handler = WhatsAppHandler()