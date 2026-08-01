from app.modules.whatsapp.client import whatsapp_client


class WhatsAppService:

    async def send_text(
        self,
        to: str,
        message: str,
    ) -> dict:

        payload = {
            "messaging_product": "whatsapp",
            "to": to,
            "type": "text",
            "text": {
                "body": message,
            },
        }

        return await whatsapp_client.post(
            payload,
        )

    async def send_buttons(
        self,
        to: str,
        body: str,
        buttons: list,
    ) -> dict:

        payload = {
            "messaging_product": "whatsapp",
            "to": to,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {
                    "text": body,
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": button["id"],
                                "title": button["title"],
                            },
                        }
                        for button in buttons
                    ]
                },
            },
        }

        return await whatsapp_client.post(
            payload,
        )


whatsapp_service = WhatsAppService()