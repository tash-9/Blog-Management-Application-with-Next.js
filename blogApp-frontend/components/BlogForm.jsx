"use client";

import { useState } from "react";
import { AlertCircle, PenSquare } from "lucide-react";

import { CATEGORIES } from "@/utils/constants";

export default function BlogForm({ initial = {}, onSubmit, pending }) {
  const [form, setForm] = useState({
    blogTitle: initial.blogTitle || initial.title || "",
    category: initial.category || "",
    blog: initial.blog || initial.content || "",
  });

  const [error, setError] = useState("");

  const isEdit = Boolean(initial.blogTitle || initial.title);

  const submit = (e) => {
    e.preventDefault();

    if (!form.blogTitle.trim() || !form.category || !form.blog.trim()) {
      return setError("Title, category, and blog content are required.");
    }

    setError("");
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="card mx-auto max-w-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary">
          <PenSquare size={18} />
        </span>

        <div>
          <h1 className="text-xl font-bold text-ink">
            {isEdit ? "Edit Blog" : "Create Blog"}
          </h1>
          <p className="text-sm text-slate-500">
            {isEdit
              ? "Update your post and republish it."
              : "Share something worth reading."}
          </p>
        </div>
      </div>

      {error && (
        <p className="alert-error mt-5">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}

      <div className="mt-6 space-y-5">
        <label className="block">
          <span className="label">Blog Title</span>

          <input
            className="field"
            placeholder="e.g. Getting Started with Playwright"
            value={form.blogTitle}
            onChange={(e) =>
              setForm({
                ...form,
                blogTitle: e.target.value,
              })
            }
          />
        </label>

        <label className="block">
          <span className="label">Category</span>

          <select
            className="field"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          >
            <option value="">Select category</option>

            {CATEGORIES.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="label">Blog Content</span>

          <textarea
            rows="10"
            className="field resize-y"
            placeholder="Write your blog content here..."
            value={form.blog}
            onChange={(e) =>
              setForm({
                ...form,
                blog: e.target.value,
              })
            }
          />
        </label>

        <button disabled={pending} className="button w-full sm:w-auto">
          {pending
            ? isEdit
              ? "Saving..."
              : "Publishing..."
            : isEdit
              ? "Save Changes"
              : "Publish Blog"}
        </button>
      </div>
    </form>
  );
}
