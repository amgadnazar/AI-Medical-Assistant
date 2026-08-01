from .enums import ConversationState
from .models import ConversationSession
from .repository import conversation_state_repository


class ConversationStateService:

    def get(
        self,
        phone: str,
    ) -> ConversationSession:

        session = conversation_state_repository.get(phone)

        if session:
            return session

        session = ConversationSession(phone=phone)

        conversation_state_repository.save(session)

        return session

    def save(
        self,
        session: ConversationSession,
    ):

        conversation_state_repository.save(session)

    def set_state(
        self,
        phone: str,
        state: ConversationState,
    ):

        session = self.get(phone)

        session.state = state

        conversation_state_repository.save(session)

    def update_data(
        self,
        phone: str,
        **kwargs,
    ):

        session = self.get(phone)

        session.data.update(kwargs)

        conversation_state_repository.save(session)

    def clear_data(
        self,
        phone: str,
    ):

        session = self.get(phone)

        session.data.clear()

        conversation_state_repository.save(session)

    def reset(
        self,
        phone: str,
    ):

        session = ConversationSession(phone=phone)

        conversation_state_repository.save(session)


conversation_state_service = ConversationStateService()