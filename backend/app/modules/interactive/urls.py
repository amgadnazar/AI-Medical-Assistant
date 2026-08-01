class Urls:

    def build(
        self,
        body: str,
        button_text: str,
        url: str,
    ) -> dict:

        return {
            "type": "cta_url",
            "body": {
                "text": body,
            },
            "action": {
                "name": "cta_url",
                "parameters": {
                    "display_text": button_text,
                    "url": url,
                },
            },
        }


urls = Urls()