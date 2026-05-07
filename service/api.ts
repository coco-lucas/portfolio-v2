import { useAuthStore } from "@/store/use-auth";
import axios from "axios";
import { AuthApi, authRoutes } from "./endpoints/auth";
import { toastError } from "@/utils";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

//TODO: Add the public routes here
const publicRoutes = ["/"];

api.interceptors.request.use(
  function (config) {
    const isPublicRoute = publicRoutes.some((route) =>
      config.url?.startsWith(route),
    );
    if (!isPublicRoute) {
      const accessToken = useAuthStore.getState().accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  function (error) {
    toastError(`Erro de requisição: ${error.message}`);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    if (response.data?.access) {
      useAuthStore
        .getState()
        .setAccessToken({ accessToken: response.data.access });
    }
    if (response.data?.refresh) {
      useAuthStore
        .getState()
        .setRefreshToken({ refreshToken: response.data.refresh });
    }

    const newToken = response.headers["x-new-access-token"];
    if (newToken && typeof newToken === "string") {
      useAuthStore.getState().setAccessToken({ accessToken: newToken });
    }

    return response;
  },
  function (error) {
    const { response } = error;

    if (response?.data?.access) {
      useAuthStore
        .getState()
        .setAccessToken({ accessToken: response.data.access });
    }
    if (response?.data?.refresh) {
      useAuthStore
        .getState()
        .setRefreshToken({ refreshToken: response.data.refresh });
    }

    const newToken = response?.headers?.["x-new-access-token"];
    if (newToken && typeof newToken === "string") {
      useAuthStore.getState().setAccessToken({ accessToken: newToken });
    }

    const errorMessage =
      response?.data?.detail || response?.data?.message || "Unknown Error";

    if (!errorMessage.includes("Invalid page")) {
      toastError(`Erro: ${errorMessage}`);
    }

    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.config?.url?.includes(authRoutes.refresh)) {
      return Promise.reject(error);
    }

    // Handle both 401 (Unauthorized) and 403 (Forbidden)
    if (
      !error.response ||
      (error.response.status !== 401 && error.response.status !== 403) ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      const refreshToken = useAuthStore.getState().refreshToken;
      if (!refreshToken) {
        throw new Error("Refresh token is required");
      }
      const response = await AuthApi.refresh({ refresh: refreshToken });
      const { access, refresh } = response.data;
      useAuthStore.getState().setAccessToken({ accessToken: access });
      useAuthStore.getState().setRefreshToken({ refreshToken: refresh });
      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);
