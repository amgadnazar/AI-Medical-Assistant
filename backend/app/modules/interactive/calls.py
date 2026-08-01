class Calls:

    def build(
        self,
        body: str,
        button_text: str,
        phone_number: str,
    ) -> dict:

        return {
            "type": "cta_call",
            "body": {
                "text": body,
            },
            "action": {
                "name": "cta_call",
                "parameters": {
                    "display_text": button_text,
                    "phone_number": phone_number,
                },
            },
        }


calls = Calls()