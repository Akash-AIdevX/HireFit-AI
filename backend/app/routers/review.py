import os
import shutil
from urllib import request

from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
    HTTPException
)

from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.database import get_db
from app.models.review import Review
from app.models.user import User

from app.routers.auth import get_current_user

from app.services.pdf_service import extract_text

import json

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.review import Review

from app.schemas.review import AnalyzeRequest

from app.services.ai_service import analyze_resume
from app.schemas import review

router = APIRouter()

router=APIRouter()

UPLOAD_DIR="uploads"

os.makedirs(UPLOAD_DIR,exist_ok=True)


@router.post("/upload")
async def upload_resume(

    file:UploadFile=File(...),

    db:Session=Depends(get_db),

    current_user:User=Depends(get_current_user)

):

    review_count = (
        db.query(Review)
        .filter(
            Review.user_id == current_user.id
        )
        .count()
    )

    if (
        current_user.plan.lower() == "free"
        and review_count >= 3
    ):

        raise HTTPException(
            status_code=403,
            detail="Free plan limit reached. Upgrade to Pro."
        )

    if not file.filename.endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    filepath=os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(filepath,"wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    extracted_text=extract_text(filepath)
    review=Review(

        user_id=current_user.id,

        resume_filename=file.filename,

        resume_text=extracted_text

    )

    db.add(review)

    db.commit()

    db.refresh(review)

    return {

        "review_id":review.id,

        "filename":file.filename,

        "extracted_characters":len(extracted_text)

    }

@router.post("/analyze")
def analyze_review(
    request: AnalyzeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    review = (
        db.query(Review)
        .filter(Review.id == request.review_id)
        .first()
    )

    if review is None:
        raise HTTPException(
            status_code=404,
            detail="Review not found",
        )

    if review.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Unauthorized"
        )

    result = analyze_resume(
        resume_text=review.resume_text,
        job_description=request.job_description,
    )

    print(result)


    review.ats_score = result["ats_score"]

    review.job_description = request.job_description

    review.strengths = json.dumps(
        result["strengths"]
    )

    review.weaknesses = json.dumps(
        result["weaknesses"]
    )

    review.missing_keywords = json.dumps(
        result["missing_keywords"]
    )

    review.ai_suggestions = json.dumps(
        result["suggestions"]
    )

    db.commit()

    db.refresh(review)

    return {
        "message": "Resume analyzed successfully",
        "review": result,
    }

@router.get("/history")
def review_history(

    db:Session=Depends(get_db),

    current_user:User=Depends(get_current_user)

):

    reviews=(
        db.query(Review)
        .filter(
            Review.user_id==current_user.id
        )
        .order_by(
            Review.created_at.desc()
        )
        .all()
    )

    data=[]

    for r in reviews:

        data.append({

            "id":r.id,

            "filename":r.resume_filename,

            "ats_score":r.ats_score,

            "created_at":str(r.created_at)

        })

    return data

@router.get("/dashboard")
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    reviews = (
        db.query(Review)
        .filter(
            Review.user_id == current_user.id
        )
        .all()
    )

    total_reviews = len(reviews)

    avg_score = 0

    if total_reviews > 0:

        avg_score = int(
            sum(
                r.ats_score or 0
                for r in reviews
            ) / total_reviews
        )

    latest = (
        db.query(Review)
        .filter(
            Review.user_id == current_user.id
        )
        .order_by(
            Review.created_at.desc()
        )
        .first()
    )

    return {

        "total_reviews": total_reviews,

        "average_score": avg_score,

        "remaining_reviews":
            "Unlimited"
            if current_user.plan.lower() == "pro"
            else max(0, 3 - total_reviews),

        "latest": None if latest is None else {

            "id": latest.id,

            "filename": latest.resume_filename,

            "score": latest.ats_score

        }

    }

@router.get("/{review_id}")
def get_review(

    review_id:int,

    db:Session=Depends(get_db),

    current_user:User=Depends(get_current_user)

):

    review=(

        db.query(Review)

        .filter(

            Review.id==review_id,

            Review.user_id==current_user.id

        )

        .first()

    )

    if review is None:

        raise HTTPException(

            404,

            "Review not found"

        )

    return{

        "id":review.id,

        "filename":review.resume_filename,

        "ats_score":review.ats_score,

        "strengths":json.loads(review.strengths or "[]"),

        "weaknesses":json.loads(review.weaknesses or "[]"),

        "missing_keywords":json.loads(review.missing_keywords or "[]"),

        "suggestions":json.loads(review.ai_suggestions or "[]"),

        "job_description":review.job_description

    }