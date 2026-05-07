import { api } from "../api";

//TODO: Update based on your correct routes
export const authRoutes = {
  signIn: "auth/sigin",
  refresh: "/auth/refresh",
};

export const AuthApi = {
  login: async ({ email, password }: { email: string; password: string }) => {
    return await api.post(authRoutes.signIn, {
      email: email,
      password: password,
    });
  },
  refresh: async (data: { refresh: string }) => {
    return api.post(authRoutes.refresh, data);
  },
};
