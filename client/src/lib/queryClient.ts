import { QueryClient } from "@tanstack/react-query";

// Simple QueryClient for client-side only state management
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// API request helper
export async function apiRequest(method: string, url: string, data?: any): Promise<Response> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin', // Include cookies for session-based auth
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`${response.status}: ${error}`);
  }
  
  return response;
}

// Query function helper
export function getQueryFn(options: { on401?: 'returnNull' | 'throw' } = {}) {
  return async ({ queryKey }: { queryKey: string[] }) => {
    try {
      const response = await apiRequest('GET', queryKey[0]);
      return await response.json();
    } catch (error: any) {
      if (error.message?.includes('401') && options.on401 === 'returnNull') {
        return null;
      }
      throw error;
    }
  };
}
