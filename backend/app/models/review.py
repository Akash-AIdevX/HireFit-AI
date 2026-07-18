from sqlalchemy import Column,Integer,Text,DateTime,ForeignKey
from sqlalchemy.sql import func
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from app.database.database import Base
from sqlalchemy import Text

class Review(Base):

    __tablename__="reviews"

    id=Column(Integer,primary_key=True,index=True)

    user_id=Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    resume_filename=Column(Text)

    resume_text=Column(Text)

    job_description=Column(Text)

    ats_score=Column(Integer,default=0)

    strengths=Column(Text)

    weaknesses=Column(Text)

    missing_keywords=Column(Text)

    ai_suggestions=Column(Text)

    created_at=Column(
        DateTime(timezone=True),
        server_default=func.now()
    )