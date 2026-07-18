from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.routers import auth
from app.routers import review
from app.routers import payment

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ResumeIQ API")


import os

print("=" * 50)
print("DATABASE_URL =", os.environ.get("DATABASE_URL"))
print("JWT_SECRET_KEY =", os.environ.get("JWT_SECRET_KEY"))
print("GEMINI_API_KEY =", os.environ.get("GEMINI_API_KEY"))
print("=" * 50)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://YOUR_PROJECT.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"]
)

app.include_router(
    review.router,
    prefix="/reviews",
    tags=["Reviews"]
)

app.include_router(
    payment.router,
    prefix="/payment",
    tags=["Payment"]
)