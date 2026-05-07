import type { Auth } from "@/types/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

//TODO: Add the SESSION_DURATION correctly
const SESSION_DURATION = 2 * 24 * 60 * 60 * 1000; // 2 dias em millisegundos
const SESSION_COOKIE = "auth-session";

function setSessionCookie(
  isAuthenticated: boolean,
  sessionExpiry: number | null,
  days = 2,
) {
  if (typeof window === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const value = JSON.stringify({ isAuthenticated, sessionExpiry });
  document.cookie = `${SESSION_COOKIE}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function clearSessionCookie() {
  if (typeof window === "undefined") return;
  document.cookie = `${SESSION_COOKIE}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
}

export const useAuthStore = create<Auth>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      sessionExpiry: null,

      setAccessToken: (data) => {
        set({
          accessToken: data.accessToken,
          isAuthenticated: !!data.accessToken,
        });
      },

      setRefreshToken: (data) => {
        set({ refreshToken: data.refreshToken });
      },

      setUser: (user) => {
        set({ user });
        const { isAuthenticated, sessionExpiry } = get();
        setSessionCookie(isAuthenticated, sessionExpiry);
      },

      login: (tokens, user = null) => {
        const expiryTime = tokens.expiresAt
          ? tokens.expiresAt * 1000
          : Date.now() + 2 * 24 * 60 * 60 * 1000;
        const newState = {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user,
          isAuthenticated: true,
          sessionExpiry: expiryTime,
        };
        set(newState);
        setSessionCookie(true, expiryTime);
      },

      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          sessionExpiry: null,
        });
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-storage");
        }
        clearSessionCookie();
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        sessionExpiry: state.sessionExpiry,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const isExpired = state.sessionExpiry
          ? Date.now() > state.sessionExpiry
          : false;

        if (state.isAuthenticated && isExpired) {
          state.accessToken = null;
          state.refreshToken = null;
          state.user = null;
          state.isAuthenticated = false;
          state.sessionExpiry = null;
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth-storage");
          }
          clearSessionCookie();
        } else if (state.isAuthenticated) {
          setSessionCookie(true, state.sessionExpiry);
        }
      },
    },
  ),
);
