export async function handleFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<T>;
}
