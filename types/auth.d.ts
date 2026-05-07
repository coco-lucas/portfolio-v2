import type { User } from "./user.d.ts";

export interface Auth {
  // Types
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  sessionExpiry: number | null;
  isAuthenticated: boolean;

  // Actions
  setAccessToken: (data: { accessToken: string }) => void;
  setRefreshToken: (data: { refreshToken: string }) => void;
  setUser: (user: User) => void;
  login: (
    tokens: { accessToken: string; refreshToken: string; expiresAt?: number },
    user?: User | null,
  ) => void;
  logout: () => void;
}
