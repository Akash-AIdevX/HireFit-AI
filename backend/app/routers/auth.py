from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.models.user import User
from app.database.database import get_db
from app.schemas.auth import Signup, Login
from app.services.auth_service import (
    get_user_by_email,
    create_user,
    authenticate_user
)
from app.core.security import (
    create_access_token,
    decode_access_token,
)

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    payload = decode_access_token(token)

    user_id = payload.get("sub")

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    user = db.query(User).filter(User.id == int(user_id)).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user


@router.post("/signup")
def signup(
    request: Signup,
    db: Session = Depends(get_db)
):

    existing_user = get_user_by_email(db, request.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    user = create_user(
        db=db,
        full_name=request.full_name,
        email=request.email,
        password=request.password
    )

    return {
        "message": "User created successfully",
        "user_id": user.id
    }


@router.post("/login")
def login(
    request: Login,
    db: Session = Depends(get_db)
):

    user = authenticate_user(
        db=db,
        email=request.email,
        password=request.password
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        {
            "sub": str(user.id)
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):

    return {
        "id": current_user.id,
        "name": current_user.full_name,
        "email": current_user.email,
        "plan": current_user.plan
    }


    return {

        "id": current_user.id,

        "full_name": current_user.full_name,

        "email": current_user.email,

        "plan": current_user.plan

    }