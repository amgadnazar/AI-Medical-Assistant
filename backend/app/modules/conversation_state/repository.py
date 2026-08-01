from datetime import datetime

from .models import ConversationSession


class ConversationStateRepository:
    """
    In-memory repository.

    This implementation is used for the MVP.
    It can later be replaced by a Supabase or Redis repository
    without changing the service layer.
    """

    def __init__(self) -> None:
        self._sessions: dict[str, ConversationSession] = {}

    def get(self, phone: str) -> ConversationSession | None:
        return self._sessions.get(phone)

    def save(self, session: ConversationSession) -> None:
        session.updated_at = datetime.utcnow()
        self._sessions[session.phone] = session

    def exists(self, phone: str) -> bool:
        return phone in self._sessions

    def delete(self, phone: str) -> None:
        self._sessions.pop(phone, None)


conversation_state_repository = ConversationStateRepository()