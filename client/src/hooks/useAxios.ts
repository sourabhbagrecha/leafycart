// useAxios.ts
import { useEffect } from "react";
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuth } from "./useAuth";

let axiosInstance: AxiosInstance | null = null;

export function useAxios(): AxiosInstance {
  const { token } = useAuth();

  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
    });
  }

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
