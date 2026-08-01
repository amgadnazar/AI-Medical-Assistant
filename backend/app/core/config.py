from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # =========================
    # Application
    # =========================
    APP_NAME: str = "AI Medical Assistant API"
    APP_VERSION: str = "1.0.0"
    APP_ENV: str = "development"

    # =========================
    # Meta WhatsApp Cloud API
    # =========================
    META_VERIFY_TOKEN: str
    META_ACCESS_TOKEN: str
    META_PHONE_NUMBER_ID: str
    META_WABA_ID: str

    # =========================
    # Google Gemini
    # =========================
    GEMINI_API_KEY: str

    # =========================
    # Supabase
    # =========================
    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
        
    )


settings = Settings()