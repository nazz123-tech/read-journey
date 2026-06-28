import { api } from "./api";
import { RegisterFormData } from "@/components/forms/RegisterForm";
import { AuthResponse } from "@/types/user";

export const registerUser = async (
  data: RegisterFormData,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/users/signup", data);
  return response.data;
};
