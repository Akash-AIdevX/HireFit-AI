from pydantic import BaseModel


class UploadResponse(BaseModel):

    review_id:int

    filename:str

    extracted_characters:int

    job_description: str


class AnalyzeRequest(BaseModel):

    review_id: int

    job_description: str