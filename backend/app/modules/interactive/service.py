from app.modules.interactive.builder import (
    interactive_builder,
)


class InteractiveService:

    def build_buttons(
        self,
        body: str,
        buttons: list,
    ):

        return interactive_builder.buttons(
            body,
            buttons,
        )

    def build_list(
        self,
        body: str,
        button_text: str,
        sections: list,
    ):

        return interactive_builder.list(
            body,
            button_text,
            sections,
        )

    def build_url(
        self,
        body: str,
        button_text: str,
        url: str,
    ):

        return interactive_builder.url(
            body,
            button_text,
            url,
        )

    def build_call(
        self,
        body: str,
        button_text: str,
        phone_number: str,
    ):

        return interactive_builder.call(
            body,
            button_text,
            phone_number,
        )


interactive_service = InteractiveService()