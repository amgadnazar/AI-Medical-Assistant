from pydantic import BaseModel


class ClinicSettingsUpdate(BaseModel):
    name: str
    description: str | None = None
    phone: str
    whatsapp: str
    email: str
    website: str
    address: str
    working_hours: str
    logo: str | None = None