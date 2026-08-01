from fastapi import APIRouter

from app.modules.conversations.service import (
    conversations_service,
)

router = APIRouter()


# =====================================================
# Conversations List
# =====================================================

@router.get("/")
def get_conversations():

    return conversations_service.get_conversations()


# =====================================================
# Conversation Messages
# =====================================================

@router.get("/{phone_number}")
def get_messages(
    phone_number: str,
):

    return conversations_service.get_messages(
        phone_number,
    )


# =====================================================
# Delete Conversation
# =====================================================

@router.delete("/{phone_number}")
def delete_conversation(
    phone_number: str,
):

    conversations_service.delete_conversation(
        phone_number,
    )

    return {
        "success": True,
        "message": "Conversation deleted successfully.",
    }