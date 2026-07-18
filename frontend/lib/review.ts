import api from "./api";

export async function uploadResume(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/reviews/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}


import {
    AnalyzeRequest,
    AnalyzeResponse
} from "@/types/review";

export async function analyzeResume(
    data: AnalyzeRequest
): Promise<AnalyzeResponse>{

    const response = await api.post(
        "/reviews/analyze",
        data
    );

    return response.data;
}

export async function getHistory(){

    const res=await api.get("/reviews/history")

    return res.data

}

export async function getReview(id:number){

    const res=await api.get(`/reviews/${id}`)

    return res.data

}

export async function getDashboardStats(){

    const res = await api.get(
        "/reviews/dashboard"
    );

    return res.data;

}