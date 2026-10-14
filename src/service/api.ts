const baseUrl = import.meta.env.VITE_BASE_URL;

class ApiService {
  protected async handleFetch<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    try {
      const makeRequest = () =>
        fetch(`${baseUrl}${endpoint}`, {
          ...options,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
        });

      let response = await makeRequest();

      if (response.status === 401) {
        await this.refreshAccessToken();
        response = await makeRequest();
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server', { cause: error });
      }

      throw error;
    }
  }

  private async refreshAccessToken() {
    const response = await fetch(`${baseUrl}/auth/refresh`, {
      credentials: 'include',
      method: 'POST',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
  }
}

export { ApiService };
