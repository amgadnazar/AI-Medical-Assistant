from app.modules.ai.gemini_service import gemini_service
from app.modules.ai.prompt_builder import prompt_builder
from app.modules.ai.response_validator import response_validator


class Assistant:

    def generate(
        self,
        profile_text: str,
        medical_context: str,
        history_text: str,
        message: str,
        conversation_state: str,
    ) -> dict:

        # ==========================
        # Build Prompt
        # ==========================

        prompt = prompt_builder.build(
            profile_text=profile_text,
            medical_context=medical_context,
            history_text=history_text,
            message=message,
            conversation_state=conversation_state,
        )
        print("=" * 60)
        print("AI CONVERSATION STATE:", conversation_state)
        print("=" * 60)
        # ==========================
        # Gemini
        # ==========================

        response = gemini_service.generate(
            prompt,
        )

        # ==========================
        # Validate
        # ==========================

        return response_validator.validate(
            response,
        )


assistant = Assistant()