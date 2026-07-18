from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(255), unique=True, nullable=False, index=True)

    password = Column(String(255), nullable=False)

    plan = Column(String(20), default="FREE")

    created_at = Column(DateTime, default=datetime.utcnow)

    stripe_customer_id = Column(
    String,
    nullable=True
    )

    stripe_subscription_id = Column(
        String,
        nullable=True
    )

    subscription_status = Column(
        String,
        default="inactive"
    )