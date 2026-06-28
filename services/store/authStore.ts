import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthResponse } from "@/types/user.ts";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  setAuth: (data: AuthResponse) => void;
  setTokens: (token: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoggedIn: false,

      setAuth: (data: AuthResponse) =>
        set({
          user: { name: data.name, email: data.email },
          token: data.token,
          refreshToken: data.refreshToken,
          isLoggedIn: true,
        }),

      setTokens: (token, refreshToken) => set({ token, refreshToken }),

      logout: () =>
        set({ user: null, token: null, refreshToken: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
