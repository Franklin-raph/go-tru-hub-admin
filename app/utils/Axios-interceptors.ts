import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://test.yamltech.com",
  isServer = typeof window === "undefined";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    if (isServer) {
      const { cookies } = await import("next/headers"),
        token = cookies().get("token")?.value;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } else {
      const userData = Cookies.get("token");

      if (userData) {
        if (userData) config.headers["Authorization"] = `Bearer ${userData}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const errorResponse = error.response;
    if (errorResponse.status === 401) {
      window.location.href = "/";
      return Promise.reject(errorResponse);
    } else {
      throw error;
    }
  }
);

export default api;