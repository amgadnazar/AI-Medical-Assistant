from app.modules.ai.assistant import assistant
from app.modules.ai.history_formatter import history_formatter
from app.modules.ai.medical_context_builder import (
    medical_context_builder,
)
from app.modules.ai.profile_formatter import profile_formatter
from app.modules.ai.response_validator import (
    response_validator,
)
from app.modules.profile.service import profile_service


class AIService:

    async def generate_response(
        self,
        user_id: str,
        message: str,
        history: list,
        conversation_state: str,
    ):

        # ==========================
        # Load Profile
        # ==========================

        profile = profile_service.get_profile(
            user_id,
        )

        # ==========================
        # Build Prompt Components
        # ==========================

        profile_text = profile_formatter.format(
            profile,
        )

        history_text = history_formatter.format(
            history,
        )

        medical_context = medical_context_builder.build(
            message,
        )

        # ==========================
        # Generate AI Response
        # ==========================

        result = assistant.generate(
            profile_text=profile_text,
            medical_context=medical_context,
            history_text=history_text,
            message=message,
            conversation_state=conversation_state,
        )

        # ==========================
        # Validate Response
        # ==========================

        return response_validator.validate(
            result,
        )


ai_service = AIService()