from typing import Optional

from pydantic import BaseModel


class ProfileUpdates(BaseModel):

    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    blood_type: Optional[str] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    allergies: Optional[str] = None
    chronic_diseases: Optional[str] = None
    medications: Optional[str] = None


class AIResponse(BaseModel):

    reply: str
    profile_updates: ProfileUpdates