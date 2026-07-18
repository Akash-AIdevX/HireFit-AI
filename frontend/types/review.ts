export interface AnalyzeRequest {
    review_id: number;
    job_description: string;
}

export interface ReviewResult {

    ats_score: number;

    strengths: string[];

    weaknesses: string[];

    missing_keywords: string[];

    suggestions: string[];
}

export interface AnalyzeResponse {

    message: string;

    review: ReviewResult;
}