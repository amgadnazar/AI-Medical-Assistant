class MessageParser:

    def parse(
        self,
        body: dict,
    ):

        try:

            value = body["entry"][0]["changes"][0]["value"]

            if "messages" not in value:
                return None

            message = value["messages"][0]

            parsed = {
                "id": message["id"],
                "from": message["from"],
                "type": message["type"],
                "message": message,
            }

            # ==========================
            # Text Message
            # ==========================

            if message["type"] == "text":

                parsed["text"] = message["text"]["body"]

                return parsed

            # ==========================
            # Button Reply
            # ==========================

            if message["type"] == "interactive":

                interactive = message["interactive"]

                if interactive["type"] == "button_reply":

                    parsed["button_id"] = interactive[
                        "button_reply"
                    ]["id"]

                    parsed["button_title"] = interactive[
                        "button_reply"
                    ]["title"]

                    return parsed

            return None

        except Exception as e:

            print(e)

            return None


message_parser = MessageParser()