import os
from pydantic_settings import BaseSettings, SettingsConfigDict

print("===== ENV TEST =====")
print("DATABASE_URL:", os.getenv("DATABASE_URL"))
print("JWT_SECRET_KEY:", os.getenv("JWT_SECRET_KEY"))
print("GEMINI_API_KEY:", os.getenv("GEMINI_API_KEY"))
print("====================")

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

    DATABASE_URL: str | None = None
    JWT_SECRET_KEY: str | None = None
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    GEMINI_API_KEY: str | None = None

    STRIPE_SECRET_KEY: str | None = None
    STRIPE_PUBLISHABLE_KEY: str | None = None
    STRIPE_WEBHOOK_SECRET: str | None = None
    OPENAI_API_KEY: str | None = None
    NEON_DATABASE_URL: str | None = None

settings = Settings()