from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import Request
from app.database.database import get_db
from app.core.dependencies import get_current_user
from app.core.config import settings
import json
from app.models.user import User
import stripe
import os
from app.database.database import SessionLocal
from app.api.schemas.billing import BillingResponse

stripe.api_key = settings.STRIPE_SECRET_KEY
print(settings.STRIPE_SECRET_KEY)
endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

router = APIRouter()

@router.post("/checkout")
def checkout(

    db:Session=Depends(get_db),

    current_user=Depends(get_current_user)

):

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        mode="subscription",
        customer_email=current_user.email,

        client_reference_id=str(current_user.id),

        line_items=[

            {

                "price":"price_1TuVP8QxScBGNVudI3iPOXt8",

                "quantity":1

            }

        ],

        success_url=f"{settings.FRONTEND_URL}/dashboard?success=true",

        cancel_url=f"{settings.FRONTEND_URL}/pricing"

    )

    return{

        "url":session.url

    }

@router.post("/webhook")
async def stripe_webhook(request: Request):

    print("========== WEBHOOK HIT ==========")

    payload = await request.body()

    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload,
            sig_header,
            endpoint_secret,
        )

        print(event["type"])

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid webhook")

    if event["type"] == "checkout.session.completed":

        session = event["data"]["object"]

        email = session["customer_details"]["email"]

        customer = session["customer"]

        subscription = session["subscription"]

        db = SessionLocal()

        user = (

            db.query(User)

            .filter(User.email == email)

            .first()

        )

        if user:

            user.plan = "Pro"

            user.subscription_status = "active"

            user.stripe_customer_id = customer

            user.stripe_subscription_id = subscription

            db.commit()

        db.close()

    elif event["type"] == "customer.subscription.updated":

        subscription = event["data"]["object"]

        db = SessionLocal()

        user = (
            db.query(User)
            .filter(
                User.stripe_subscription_id == subscription["id"]
            )
            .first()
        )

        if user:

            if subscription["cancel_at_period_end"]:

                user.subscription_status = "canceling"

            else:

                user.subscription_status = subscription["status"]

            db.commit()

        db.close()

        
    elif event["type"] == "customer.subscription.deleted":

        subscription = event["data"]["object"]

        db = SessionLocal()

        user = (
            db.query(User)
            .filter(
                User.stripe_subscription_id == subscription["id"]
            )
            .first()
        )

        if user:

            user.plan = "Free"
            user.subscription_status = "canceled"
            user.stripe_subscription_id = None

            db.commit()

        db.close()
    return {

        "status": "success"

    }

@router.get(
    "/billing",
    response_model=BillingResponse
)
def get_billing(

    current_user: User = Depends(get_current_user)

):

    return BillingResponse(

        plan=current_user.plan,

        subscription_status=current_user.subscription_status,

        stripe_customer_id=current_user.stripe_customer_id,

    )

@router.post("/cancel")
def cancel_subscription(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):

    if not current_user.stripe_subscription_id:

        raise HTTPException(

            status_code=400,

            detail="No active subscription"

        )

    stripe.Subscription.modify(

        current_user.stripe_subscription_id,

    )

    current_user.subscription_status = "canceling"

    db.commit()

    db.refresh(current_user)

    return {

        "message": "Subscription will cancel at period end"

    }
