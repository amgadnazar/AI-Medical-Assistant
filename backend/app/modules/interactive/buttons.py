class Buttons:

    def build(
        self,
        body: str,
        buttons: list[dict],
    ) -> dict:

        return {
            "type": "button",
            "body": {
                "text": body,
            },
            "action": {
                "buttons": buttons,
            },
        }


buttons = Buttons()