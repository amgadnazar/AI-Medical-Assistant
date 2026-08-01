class Lists:

    def build(
        self,
        body: str,
        button_text: str,
        sections: list,
    ) -> dict:

        return {
            "type": "list",
            "body": {
                "text": body,
            },
            "action": {
                "button": button_text,
                "sections": sections,
            },
        }


lists = Lists()