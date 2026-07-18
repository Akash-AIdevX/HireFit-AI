from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",          # Used locally
        env_ignore_empty=True,
        extra="ignore",
        case_sensitive=True,
    )

    DATABASE_URL: str
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    GEMINI_API_KEY: str

    STRIPE_SECRET_KEY: str | None = None
    STRIPE_PUBLISHABLE_KEY: str | None = None
    STRIPE_WEBHOOK_SECRET: str | None = None

    OPENAI_API_KEY: str | None = None
    NEON_DATABASE_URL: str | None = None


settings = Settings()

print("\n========== SETTINGS LOADED ==========")
print("DATABASE_URL:", "Loaded" if settings.DATABASE_URL else "Missing")
print("JWT_SECRET_KEY:", "Loaded" if settings.JWT_SECRET_KEY else "Missing")
print("GEMINI_API_KEY:", "Loaded" if settings.GEMINI_API_KEY else "Missing")
print("=====================================\n")