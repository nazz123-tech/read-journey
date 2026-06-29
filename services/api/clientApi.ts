import { api } from "./api";
import { RegisterFormData } from "@/components/forms/RegisterForm";
import { LoginFormData } from "@/components/forms/LoginForm";
import { AuthResponse } from "@/types/user";

export const registerUser = async (
  data: RegisterFormData,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/users/signup", data);
  return response.data;
};

export const loginUser = async (data: LoginFormData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/users/signin', data)
  return response.data;
}

export const logoutUser=async():Promise<void>=>{
  await api.post('/users/signout')
}