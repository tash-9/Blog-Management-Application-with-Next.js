import { api } from "@/utils/api";

export const register = (payload) =>
  api("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const login = (payload) =>
  api("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const forgotPassword = (email) =>
  api("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const resetPassword = (token, password) =>
  api(`/auth/reset-password/${token}`, {
    method: "PATCH",
    body: JSON.stringify({ password }),
  });

