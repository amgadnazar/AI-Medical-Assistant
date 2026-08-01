from dataclasses import dataclass, field
from datetime import datetime
from typing import Any

from .enums import ConversationState


@dataclass
class ConversationSession:
    phone: str
    state: ConversationState = ConversationState.IDLE
    data: dict[str, Any] = field(default_factory=dict)
    updated_at: datetime = field(default_factory=datetime.utcnow)