import { api } from "@/utils/api";

export const getBlogs = (filters = {}) => {
  const q = new URLSearchParams(
    Object.entries(filters).filter(([, v]) => v)
  );

  return api(`/blogs${q.toString() ? `?${q}` : ""}`);
};

export const getBlog = (id) =>
  api(`/blogs/${id}`);

export const createBlog = (payload) =>
  api("/blogs/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateBlog = (id, payload) =>
  api(`/blogs/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteBlog = (id) =>
  api(`/blogs/delete/${id}`, {
    method: "DELETE",
  });
