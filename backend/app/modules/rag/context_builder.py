class ContextBuilder:

    def build(
        self,
        results: list,
    ) -> str:

        if not results:
            return "No relevant medical knowledge found."

        sections = []

        for item in results:

            sections.append(
                f"""Source: {item['metadata']['source']}
Page: {item['metadata']['page']}

{item['document']}"""
            )

        return "\n\n====================\n\n".join(
            sections
        )


context_builder = ContextBuilder()