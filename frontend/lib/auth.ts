import api from "./api";
import {
  LoginRequest,
  SignupRequest,
  LoginResponse,
  User,
} from "@/types/auth";

export async function signup(data: SignupRequest) {
  const response = await api.post("/auth/signup", data);
  return response.data;
}

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get("/auth/me");
  return response.data;
}