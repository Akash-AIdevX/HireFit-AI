from pydantic_settings import BaseSettings

class Settings(BaseSettings):

    DATABASE_URL: str
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    STRIPE_WEBHOOK_SECRET: str | None = None
    NEON_DATABASE_URL: str | None = None
    OPENAI_API_KEY: str | None = None
    GEMINI_API_KEY: str

    STRIPE_SECRET_KEY: str | None = None
    STRIPE_PUBLISHABLE_KEY: str | None = None

    class Config:
        env_file = ".env"


settings = Settings()

print("DATABASE_URL =", settings.DATABASE_URL)
print("STRIPE_KEY =", settings.STRIPE_SECRET_KEY)