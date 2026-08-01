from app.modules.interactive.buttons import buttons
from app.modules.interactive.calls import calls
from app.modules.interactive.lists import lists
from app.modules.interactive.urls import urls


class InteractiveBuilder:

    def buttons(
        self,
        body: str,
        buttons_data: list,
    ):

        return buttons.build(
            body,
            buttons_data,
        )

    def list(
        self,
        body: str,
        button_text: str,
        sections: list,
    ):

        return lists.build(
            body,
            button_text,
            sections,
        )

    def url(
        self,
        body: str,
        button_text: str,
        url: str,
    ):

        return urls.build(
            body,
            button_text,
            url,
        )

    def call(
        self,
        body: str,
        button_text: str,
        phone_number: str,
    ):

        return calls.build(
            body,
            button_text,
            phone_number,
        )


interactive_builder = InteractiveBuilder()