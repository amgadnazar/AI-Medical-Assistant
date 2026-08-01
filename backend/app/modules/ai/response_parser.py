from app.modules.ai.schema import AIResponse


class ResponseParser:

    def parse(
        self,
        response,
    ) -> dict:

        parsed = response.parsed

        if parsed is None:

            return {
                "reply": "",
                "profile_updates": {},
            }

        if isinstance(parsed, AIResponse):

            result = parsed.model_dump()

        else:

            result = parsed

        if not isinstance(result, dict):

            return {
                "reply": "",
                "profile_updates": {},
            }

        result.setdefault("reply", "")
        result.setdefault("profile_updates", {})

        if result["profile_updates"] is None:
            result["profile_updates"] = {}

        return result


response_parser = ResponseParser()