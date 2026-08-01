from pydantic import BaseModel


class SettingsUpdate(BaseModel):
    language: str
    timezone: str