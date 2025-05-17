import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

interface GetQueryFnOptions {
  on401?: "returnNull" | "throw";
}

export function getQueryFn({ on401 = "throw" }: GetQueryFnOptions = {}) {
  return async ({ queryKey }: { queryKey: string[] }) => {
    const url = queryKey[0];
    
    const response = await fetch(url);
    
    if (response.status === 401) {
      if (on401 === "returnNull") {
        return null;
      } else {
        throw new Error("Unauthorized");
      }
    }
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    
    return response.json();
  };
}

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export async function apiRequest(
  method: Method,
  url: string,
  body?: any
): Promise<Response> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    // Try to parse error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    } catch (e) {
      // If parsing fails, throw generic error
      if (e instanceof Error && e.message.includes("JSON")) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      throw e;
    }
  }

  return response;
}