from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def health():
    return {
        "status": "healthy",
        "message": "AI Medical Assistant API is running",
    }