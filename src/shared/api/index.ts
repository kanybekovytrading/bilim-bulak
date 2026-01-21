import axios from "axios";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import {
  buildLangBaseURL,
  getLangFromHostPath,
  shouldUseLangApi,
} from "../lib/utils/helpers";
import { BASE_API_URL } from "../lib/utils/constants";

export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 15_000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.url) {
    const isAbsolute = /^https?:\/\//i.test(config.url);

    if (!isAbsolute) {
      const base = BASE_API_URL;
      const lang = getLangFromHostPath();

      config.baseURL = shouldUseLangApi(config.url)
        ? buildLangBaseURL(base, lang)
        : base;
    }
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response.status;

    if (!status) return Promise.reject(error);

    const url = error?.config?.url ?? "";

    const skip401For = ["/auth/login"];

    const shouldSkip401 = skip401For.some((p) => url.includes(p));

    if (status === 401 && !shouldSkip401) {
      useAuthStore.getState().logout();

      if (typeof window !== "undefined") {
        window.location.href = "/auth/sign-in";
      }
    }

    return Promise.reject(error);
  }
);
