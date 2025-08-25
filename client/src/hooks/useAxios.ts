// useAxios.ts
import { useEffect } from "react";
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuth } from "./useAuth";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "" : "http://localhost:3000",
});

export function useAxios(): AxiosInstance {
  const { token } = useAuth();

  useEffect(() => {
    const reqInterceptor = axiosInstance!.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          } as typeof config.headers;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosInstance!.interceptors.request.eject(reqInterceptor);
    };
  }, [token]);

  return axiosInstance!;
}
