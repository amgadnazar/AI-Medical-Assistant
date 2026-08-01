import httpx

from app.core.config import settings


class WhatsAppClient:
    BASE_URL = "https://graph.facebook.com/v25.0"

    def __init__(self):
        self.phone_number_id = settings.META_PHONE_NUMBER_ID
        self.access_token = settings.META_ACCESS_TOKEN

        print("PHONE ID:", self.phone_number_id)
        print("TOKEN:", self.access_token[:20])

    @property
    def headers(self) -> dict:
        return {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json",
        }

    @property
    def messages_url(self) -> str:
        return f"{self.BASE_URL}/{self.phone_number_id}/messages"

    async def post(self, payload: dict) -> dict:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                self.messages_url,
                headers=self.headers,
                json=payload,
            )

        print("=" * 80)
        print("STATUS:", response.status_code)
        print(response.text)
        print("=" * 80)

        response.raise_for_status()
        return response.json()


whatsapp_client = WhatsAppClient()