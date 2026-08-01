from fastapi import APIRouter
import httpx

from app.modules.settings.service import settings_service

router = APIRouter()


@router.get("/test")
async def test_whatsapp_connection():

    settings = settings_service.get()

    token = settings.get("whatsapp_access_token")
    phone_id = settings.get("whatsapp_phone_number_id")

    if not token or not phone_id:
        return {
            "connected": False,
            "message": "Missing WhatsApp configuration."
        }

    url = f"https://graph.facebook.com/v23.0/{phone_id}"

    async with httpx.AsyncClient() as client:

        response = await client.get(
            url,
            headers={
                "Authorization": f"Bearer {token}"
            }
        )

    if response.status_code == 200:
        return {
            "connected": True,
            "message": "Connected successfully."
        }

    return {
        "connected": False,
        "message": "Connection failed."
    }