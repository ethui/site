import { useCallback, useEffect, useState } from "react";
import { authConfig, makeApiRequest } from "./config";

export type AuthStep = "email" | "verification" | "authenticated";

export interface AuthState {
  step: AuthStep;
  email: string;
  code: string;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const STORAGE_KEY = "ethui_auth_token";

// Simple JWT token expiry check (without full validation)
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp < currentTime;
  } catch {
    return true; // Consider invalid tokens as expired
  }
};

export const useAuthStore = () => {
  const [state, setState] = useState<AuthState>({
    step: "email",
    email: "",
    code: "",
    token: null,
    loading: false,
    error: null,
  });

  // Initialize from localStorage on mount with token validation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem(STORAGE_KEY);
      if (savedToken) {
        // Check if token is expired
        if (isTokenExpired(savedToken)) {
          // Remove expired token
          localStorage.removeItem(STORAGE_KEY);
          setState((prev) => ({
            ...prev,
            token: null,
            step: "email",
          }));
        } else {
          setState((prev) => ({
            ...prev,
            token: savedToken,
            step: "authenticated",
          }));
        }
      }
    }
  }, []);

  const setEmail = useCallback((email: string) => {
    setState((prev) => ({ ...prev, email, error: null }));
  }, []);

  const setCode = useCallback((code: string) => {
    setState((prev) => ({ ...prev, code, error: null }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error, loading: false }));
  }, []);

  const sendCode = useCallback(async (email: string) => {
    console.log("Here", email);
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await makeApiRequest(authConfig.endpoints.sendCode, { email });
      setState((prev) => ({
        ...prev,
        loading: false,
        step: "send-code",
        email,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to send verification code",
      }));
    }
  }, []);

  const verifyCode = useCallback(async (email: string, code: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await makeApiRequest(authConfig.endpoints.verifyCode, {
        email,
        code,
      });
      const token = result.token;

      // Validate token before saving
      if (isTokenExpired(token)) {
        throw new Error("Received expired token from server");
      }

      // Save token to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, token);
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        step: "authenticated",
        token,
        code,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to verify code",
      }));
    }
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setState({
      step: "email",
      email: "",
      code: "",
      token: null,
      loading: false,
      error: null,
    });
  }, []);

  const reset = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: "email",
      email: "",
      code: "",
      error: null,
      loading: false,
    }));
  }, []);

  const goBackToEmail = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: "email",
      code: "",
      error: null,
    }));
  }, []);

  return {
    ...state,
    setEmail,
    setCode,
    setError,
    sendCode,
    verifyCode,
    logout,
    reset,
    goBackToEmail,
    isAuthenticated: state.token !== null && !isTokenExpired(state.token || ""),
  };
};
