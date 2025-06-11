const STORAGE_KEY = "ethui_auth_token";

export const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
};

export const clearStoredToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};

export const makeAuthenticatedRequest = async (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  const token = getStoredToken();

  if (!token) {
    throw new Error("No authentication token available");
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");

  const response = await fetch(url, {
    ...options,
    headers,
    mode: "cors",
    credentials: "include",
  });

  if (response.status === 401) {
    // Token is invalid or expired, clear it
    clearStoredToken();
    throw new Error("Authentication token expired or invalid");
  }

  return response;
};

export const makeAuthenticatedJsonRequest = async <T = any>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await makeAuthenticatedRequest(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Request failed with status ${response.status}`,
    );
  }

  return response.json();
};

export const isAuthenticated = (): boolean => {
  return getStoredToken() !== null;
};
