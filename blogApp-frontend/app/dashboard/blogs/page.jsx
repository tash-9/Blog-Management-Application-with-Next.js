"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PenSquare, Pencil, Trash2, AlertCircle, CheckCircle2, Newspaper } from "lucide-react";

import { getBlogs, deleteBlog } from "@/services/blog.service";
import { useAuth } from "@/contexts/AuthContext";

import Loader from "@/components/Loader";
import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import BackButton from "@/components/BackButton";

export default function BlogsPage() {
  const { user } = useAuth();
  const admin = String(user?.role || "").toLowerCase() === "admin";

  const [blogs, setBlogs] = useState(null);
  const [selected, setSelected] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = () =>
    getBlogs()
      .then((d) => {
        const all = d.blogs || d.data || d || [];

        // GET /api/blogs is the public, unfiltered list - admins see
        // everything under "All Blogs", but a normal user's "My Blogs"
        // should only contain posts they authored
        const scoped = admin
          ? all
          : all.filter((b) => (b.author?.id ?? b.user?.id) === user?.id);

        setBlogs(scoped);
      })
      .catch((e) => {
        setError(e.message);
        setBlogs([]);
      });

  useEffect(() => {
    if (user) {
      load();
    }
  }, [user, admin]);

  const remove = async () => {
    setPending(true);

    try {
      await deleteBlog(selected._id || selected.id);
      setSelected(null);
      setMessage("Blog deleted successfully.");
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setPending(false);
    }
  };

  if (!blogs) {
    return <Loader text="Loading blogs..." />;
  }

  return (
    <div className="mx-auto max-w-6xl">
       <BackButton href="/dashboard" label="Back to Dashboard" />
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-ink">
            {admin ? "All Blogs" : "My Blogs"}
          </h1>
          <p className="mt-1.5 text-slate-500">
            {admin
              ? "Manage every published post."
              : "Manage your published posts."}
          </p>
        </div>

        <Link href="/dashboard/blogs/create" className="button shrink-0">
          <PenSquare size={16} />
          Create Blog
        </Link>
      </div>

      {message && (
        <p className="alert-success mt-5">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          {message}
        </p>
      )}

      {error && (
        <p className="alert-error mt-5">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}

      <div className="card mt-7 overflow-hidden">
        {blogs.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Author</th>
                  <th className="p-4 font-semibold">Created</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((b) => {
                  const author = b.author || b.user || {};

                  return (
                    <tr
                      key={b._id || b.id}
                      className="border-t border-slate-100 transition hover:bg-slate-50/60"
                    >
                      <td className="p-4 font-semibold text-ink">
                        {b.blogTitle || b.title}
                      </td>

                      <td className="p-4">
                        <span className="badge-category">{b.category}</span>
                      </td>

                      <td className="p-4 text-slate-600">
                        {[author.firstname, author.lastname]
                          .filter(Boolean)
                          .join(" ") || "—"}
                      </td>

                      <td className="p-4 text-slate-500">
                        {b.createdAt &&
                          new Date(b.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Link
                            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-primary hover:bg-primary-50"
                            href={`/dashboard/blogs/${b._id || b.id}/edit`}
                          >
                            <Pencil size={14} />
                            Edit
                          </Link>

                          <button
                            className="button-ghost-danger"
                            onClick={() => setSelected(b)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={Newspaper}
            title={
              admin ? "No blogs found" : "You haven't created any blogs yet"
            }
            description={
              admin
                ? undefined
                : "Click 'Create Blog' to publish your first post."
            }
          />
        )}
      </div>

      <ConfirmDialog
        open={!!selected}
        pending={pending}
        onCancel={() => setSelected(null)}
        onConfirm={remove}
      />
    </div>
  );
}