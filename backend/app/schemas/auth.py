from pydantic import BaseModel, EmailStr, Field


class Signup(BaseModel):

    full_name: str

    email: EmailStr

    password: str = Field(
        min_length=8,
        max_length=72
    )


class Login(BaseModel):

    email: EmailStr

    password: str = Field(
        min_length=8,
        max_length=72
    )


class Token(BaseModel):

    access_token: str

    token_type: str