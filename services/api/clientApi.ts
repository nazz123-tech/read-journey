import { api } from "./api";
import { RegisterFormData } from "@/components/forms/RegisterForm";
import { LoginFormData } from "@/components/forms/LoginForm";
import { AuthResponse } from "@/types/user";
import { BooksResponse } from "@/types/book";
import { Book } from "@/types/book";

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

export const getRecommendedBooks = async (params?: {
  title?: string
  author?: string
  page?: number
  limit?: number
}): Promise<BooksResponse> => {
  const { data } = await api.get<BooksResponse>("/books/recommend", { params })
  return data
}

export const addToLibrary = async (bookId:string):Promise<void>=> {
  await api.post(`/books/add/${bookId}`)
}

export const getMyBooks = async (params?: {
  status?: string
  page?: number
  limit?: number
}): Promise<{ results: Book[]; totalPages: number }> => {
  const { data } = await api.get("/books/own", { params })
  return data
}

export const addOwnBook = async (data: {
  title: string,
  author: string,
  totalPages: number,
}
): Promise<Book> => {
  const { data: res } = await api.post<Book>("/books/add", data)
  return res
}