export const fetcher = async <T>([input, token]: [RequestInfo, string?], init?: RequestInit): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const combinedInit: RequestInit = {
    ...init,
    headers: {
      ...headers,
      ...(init?.headers ?? {}),
    },
  };

  const response = await fetch(input, combinedInit);
  
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'Network response was not ok');
  }
  
  return response.json();
};
