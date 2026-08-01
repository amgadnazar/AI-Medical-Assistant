from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

router = APIRouter()


@router.post("/whatsapp")
async def whatsapp_webhook(request: Request):
    payload = await request.json()

    print("\n" + "=" * 60)
    print("NEW WHATSAPP WEBHOOK")
    print("=" * 60)
    print(payload)
    print("=" * 60)

    return JSONResponse(
        status_code=200,
        content={"status": "success"},
    )