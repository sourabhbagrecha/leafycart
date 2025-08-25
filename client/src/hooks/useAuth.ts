import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { axiosInstance } from "./useAxios";

interface AuthContextType {
  token: string | null;
  user: unknown;
  loading: boolean;
  logout: () => void;
  refreshToken: () => Promise<string | void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth on app load
  useEffect(() => {
    initializeAuth();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeAuth = async () => {
    try {
      // Check if token exists in localStorage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && storedToken !== "undefined") {
        setToken(storedToken);
        // Optionally fetch user data
      } else {
        // No token, create new anonymous user
        await createAnonymousUser();
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      // Fallback: create anonymous user
      await createAnonymousUser();
    } finally {
      function sleep(ms: number) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
      await sleep(1000);
      setLoading(false);
    }
  };

  const createAnonymousUser = async () => {
    try {
      const { data, status } = await axiosInstance.get("/api/users/register");

      if (status !== 200) throw new Error("Failed to create anonymous user");

      const { accessToken: newToken } = await data;

      // Store token
      localStorage.setItem("authToken", newToken);
      setToken(newToken);
    } catch (error) {
      console.error("Failed to create anonymous user:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    // Optionally create a new anonymous user immediately
    createAnonymousUser();
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const { token: newToken } = await response.json();
        localStorage.setItem("authToken", newToken);
        setToken(newToken);
        return newToken;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      // If refresh fails, create new anonymous user
      await createAnonymousUser();
    }
  };

  const value = {
    token,
    user,
    loading,
    logout,
    refreshToken,
    isAuthenticated: !!token,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};
