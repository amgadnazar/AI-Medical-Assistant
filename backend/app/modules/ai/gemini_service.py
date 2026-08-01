from google.genai import types

from app.modules.ai.client import gemini_client
from app.modules.ai.schema import AIResponse


class GeminiService:

    def generate(
        self,
        prompt: str,
    ) -> dict:

        response = gemini_client.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=AIResponse,
                temperature=0.2,
            ),
        )

        return response.parsed.model_dump()


gemini_service = GeminiService()