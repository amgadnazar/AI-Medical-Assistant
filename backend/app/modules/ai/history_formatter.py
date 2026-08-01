class HistoryFormatter:

    def format(
        self,
        history: list,
    ) -> str:

        if not history:
            return "No conversation history."

        lines = []

        for item in history:

            role = (
                "Patient"
                if item["role"] == "user"
                else "Assistant"
            )

            lines.append(
                f"{role}: {item['message']}"
            )

        return "\n".join(lines)


history_formatter = HistoryFormatter()