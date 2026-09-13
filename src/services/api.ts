// Base API wrapper for team integration
// When backend endpoints are live at /api, this handles standard HTTP calls.
// If backend is unavailable or returns 404/ECONNREFUSED, calls can seamlessly fallback.

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // Teammate backend might not be online yet.
    // Propagate error to let service handle mock fallback cleanly.
    throw error;
  }
}
