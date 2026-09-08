
import { getToken } from "./auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function api(path, options = {}) {
  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        }),
    ...options.headers,
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message ||
        data.error ||
        "Something went wrong. Please try again."
    );
  }

  return data;
}

