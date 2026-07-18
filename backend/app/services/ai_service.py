import json

from google import genai

from app.core.config import settings

client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)

def analyze_resume(
    resume_text: str,
    job_description: str,
):

    prompt = f"""
You are an expert ATS Resume Reviewer.

Compare the resume with the job description.

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT wrap the response inside ```json.

Do NOT explain anything.

Output must start with {{

Output must end with }}

Return this exact structure:

{{
    "ats_score": 0,
    "strengths": [],
    "weaknesses": [],
    "missing_keywords": [],
    "suggestions": []
}}

Resume:

{resume_text}

Job Description:

{job_description}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "")
        text = text.replace("```", "")

    elif text.startswith("```"):
        text = text.replace("```", "")

    text = text.strip()

    return json.loads(text)