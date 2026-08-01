class ResponseValidator:

    ALLOWED_FIELDS = {
        "name",
        "age",
        "gender",
        "blood_type",
        "height",
        "weight",
        "allergies",
        "chronic_diseases",
        "medications",
    }

    def validate(
        self,
        response: dict,
    ) -> dict:

        if not isinstance(response, dict):

            return {
                "reply": "",
                "profile_updates": {},
            }

        reply = response.get("reply")

        if not isinstance(reply, str):
            reply = ""

        profile_updates = response.get(
            "profile_updates",
            {},
        )

        if not isinstance(profile_updates, dict):
            profile_updates = {}

        cleaned_updates = {}

        for key, value in profile_updates.items():

            if key not in self.ALLOWED_FIELDS:
                continue

            # None يعني حذف القيمة
            if value is None:
                cleaned_updates[key] = None
                continue

            # تنظيف النصوص
            if isinstance(value, str):

                value = value.strip()

                if value == "":
                    continue

            # التأكد من الأرقام
            if key in {"age", "height", "weight"}:

                if not isinstance(value, (int, float)):
                    continue

            cleaned_updates[key] = value

        return {
            "reply": reply,
            "profile_updates": cleaned_updates,
        }


response_validator = ResponseValidator()