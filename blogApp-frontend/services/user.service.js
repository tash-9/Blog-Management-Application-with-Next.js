import { api } from "@/utils/api";

export const getProfile = () =>
  api("/users/profile");

export const updateProfile = (payload) =>
  api("/users/profile/update", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const uploadProfileImage = (image) => {
  const form = new FormData();

  form.append("image", image);

  return api("/users/profile/image", {
    method: "PATCH",
    body: form,
  });
};

export const changePassword = (password) =>
  api("/users/password", {
    method: "PATCH",
    body: JSON.stringify({ password }),
  });

export const getUsers = () =>
  api("/users");

export const getUser = (id) =>
  api(`/users/${id}`);

export const setUserStatus = (id, isActive) =>
  api(`/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
  });

