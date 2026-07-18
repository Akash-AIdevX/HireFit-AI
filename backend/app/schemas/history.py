from pydantic import BaseModel

class ReviewHistory(BaseModel):

    id:int

    filename:str

    ats_score:int

    created_at:str

    class Config:

        from_attributes=True