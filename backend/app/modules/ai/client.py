from google import genai

from app.core.config import settings


class GeminiClient:

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )


gemini_client = GeminiClient()