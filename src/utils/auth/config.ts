export const authConfig = {
  serverUrl: (() => {
    const url = import.meta.env.VITE_STACKS_SERVER_URL;
    if (!url) {
      if (import.meta.env.MODE === "production") {
        throw new Error(
          "Environment variable VITE_STACKS_SERVER_URL is missing. Please set it in your environment configuration.",
        );
      } else {
        return "http://api.stacks.lvh.me:4000";
      }
    }
    return url;
  })(),
  endpoints: {
    sendCode: "/auth/send-code",
    verifyCode: "/auth/verify-code",
  },
} as const;

export const makeApiRequest = async (
  endpoint: string,
  data: Record<string, any>,
) => {
  const url = `${authConfig.serverUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    // Handle CORS and other network errors
    if (!response.ok) {
      let errorMessage = "Authentication request failed";

      try {
        const result = await response.json();
        errorMessage =
          result.error || result.errors || result.message || errorMessage;
      } catch {
        // If we can't parse the response as JSON, use status-based messages
        if (response.status === 0 || response.status === 404) {
          errorMessage =
            "Unable to connect to authentication server. Please check your network connection.";
        } else if (response.status === 500) {
          errorMessage = "Authentication server error. Please try again later.";
        } else {
          errorMessage = `Authentication failed with status ${response.status}`;
        }
      }

      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    // Handle network errors and CORS issues
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Unable to connect to authentication server. This might be due to CORS configuration or network issues.",
      );
    }

    // Re-throw other errors as-is
    throw error;
  }
};
