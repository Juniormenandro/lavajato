export const fetcher = async <T>(input: RequestInfo, init?: RequestInit, token?: string | null): Promise<T> => {
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
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};
