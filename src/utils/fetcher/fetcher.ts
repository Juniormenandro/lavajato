export const fetcher = async <T>(
  [input, token, startDate, endDate]: [RequestInfo, string?, string?, string?], 
  init?: RequestInit
): Promise<T> => {
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

  const urlWithParams = new URL(input as string);
  if(startDate) urlWithParams.searchParams.append('startDate', startDate);
  if(endDate) urlWithParams.searchParams.append('endDate', endDate);

  const response = await fetch(urlWithParams.toString(), combinedInit);
  //console.log("Request Headers:", combinedInit.headers);  // Verifique os headers aqui

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'Network response was not ok');
  }
  
  return response.json();
};
