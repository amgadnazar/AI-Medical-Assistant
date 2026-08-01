from fastapi import APIRouter, HTTPException, Query, Request
from app.core.config import settings
from app.modules.whatsapp.handler import whatsapp_handler
import requests

router = APIRouter()


@router.get("/")
async def verify_webhook(
    hub_mode: str = Query(alias="hub.mode"),
    hub_verify_token: str = Query(alias="hub.verify_token"),
    hub_challenge: str = Query(alias="hub.challenge"),
):
    if (
        hub_mode == "subscribe"
        and hub_verify_token == settings.META_VERIFY_TOKEN
    ):
        return int(hub_challenge)

    raise HTTPException(
        status_code=403,
        detail="Verification failed",
    )


@router.post("/")
async def receive_webhook(request: Request):
    body = await request.json()

    print("\n" + "=" * 60)
    print("NEW WHATSAPP WEBHOOK")
    print("=" * 60)
    print(body)
    print("=" * 60)
    print("HANDLER START")

    try:
        await whatsapp_handler.handle_message(body)

    except Exception as e:
        print("=" * 80)
        print("WEBHOOK ERROR")
        print(e)
        print("=" * 80)

    print("HANDLER END")

    return {"status": "ok"}


@router.get("/test")
def test_connection():

    if (
        not settings.META_PHONE_NUMBER_ID
        or not settings.META_ACCESS_TOKEN
    ):
        return {
            "connected": False,
            "message": "Missing WhatsApp configuration.",
        }

    url = (
        f"https://graph.facebook.com/v23.0/"
        f"{settings.META_PHONE_NUMBER_ID}"
    )

    response = requests.get(
        url,
        headers={
            "Authorization": f"Bearer {settings.META_ACCESS_TOKEN}",
        },
    )

    if response.status_code == 200:
        return {
            "connected": True,
            "message": "WhatsApp Cloud API connected successfully.",
            "data": response.json(),
        }

    return {
        "connected": False,
        "message": "Connection failed.",
        "error": response.json(),
    }