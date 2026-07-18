from pydantic import BaseModel


class BillingResponse(BaseModel):
    plan: str
    subscription_status: str
    stripe_customer_id: str | None = None