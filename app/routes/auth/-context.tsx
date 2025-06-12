import { authConfig, makeApiRequest } from "#/utils/auth/config";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthStep = "email" | "verification" | "authenticated";

export interface AuthState {
  step: AuthStep;
  email: string | null;
  code: number | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface AuthCallbacks {
  sendCode: (email: string) => void;
  verifyCode: (email: string, code: number) => void;
  goBackToEmail: () => void;
}

type AuthContextT = AuthState & AuthCallbacks;

const STORAGE_KEY = "ethui_auth_token";

const AuthContext = createContext<AuthContextT | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    step: "email",
    email: null,
    loading: false,
    error: null,
    code: null,
    token: null,
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
          setState((prev: AuthState) => ({
            ...prev,
            token: null,
            step: "email",
          }));
        } else {
          setState((prev: AuthState) => ({
            ...prev,
            token: savedToken,
            step: "authenticated",
          }));
        }
      }
    }
  }, []);

  const setCode = useCallback((code: number) => {
    setState((prev) => ({ ...prev, code, error: null }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error, loading: false }));
  }, []);

  const sendCode = useCallback(
    async (email: string) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        await makeApiRequest(authConfig.endpoints.sendCode, { email });
        setState((prev) => ({
          ...prev,
          loading: false,
          step: "verification",
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
    },
    [state],
  );

  const verifyCode = useCallback(async (email: string, code: number) => {
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

  const reset = useCallback(() => {
    setState((prev: AuthState) => ({
      ...prev,
      step: "email",
      email: "",
      code: null,
      error: null,
      loading: false,
    }));
  }, []);

  const goBackToEmail = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: "email",
      code: null,
      error: null,
    }));
  }, []);

  const value = {
    ...state,
    setCode,
    setError,
    sendCode,
    verifyCode,
    reset,
    goBackToEmail,
    isAuthenticated: state.token !== null && !isTokenExpired(state.token || ""),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
