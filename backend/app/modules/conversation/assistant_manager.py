from app.modules.ai.service import ai_service


class AssistantManager:

    async def generate_reply(
        self,
        phone_number: str,
        message: str,
        history: list,
        conversation_state: str,
    ):

        return await ai_service.generate_response(
            user_id=phone_number,
            message=message,
            history=history,
            conversation_state=conversation_state,
        )


assistant_manager = AssistantManager()