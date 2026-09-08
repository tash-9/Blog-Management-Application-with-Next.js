const TOKEN_KEY = "blogapp_token";

export const getToken = () =>
  typeof window === "undefined"
    ? null
    : localStorage.getItem(TOKEN_KEY);

export const saveToken = (token) =>
  localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () =>
  localStorage.removeItem(TOKEN_KEY);
