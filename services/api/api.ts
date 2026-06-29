import axios from "axios";
import { useAuthStore } from "../store/authStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({ baseURL: BASE_URL });


api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Refresh логіка
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthUrl =
      originalRequest.url?.includes("/users/signout") ||
      originalRequest.url?.includes("/users/current/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthUrl
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;

        const { data } = await axios.get(
          `${BASE_URL}/users/current/refresh`,
          { headers: { Authorization: `Bearer ${refreshToken}` } },
        );

        useAuthStore.getState().setTokens(data.token, data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);