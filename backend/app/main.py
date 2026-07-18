from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import Base, engine
from app.routers import auth
from app.routers import review
from app.routers import payment

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ResumeIQ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
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

from app.routers import review

app.include_router(
    review.router,
    prefix="/reviews",
    tags=["Reviews"]
)

app.include_router(
    review.router,
    prefix="/reviews",
    tags=["Reviews"],
)

app.include_router(

payment.router,

prefix="/payment",

tags=["Payment"]

)