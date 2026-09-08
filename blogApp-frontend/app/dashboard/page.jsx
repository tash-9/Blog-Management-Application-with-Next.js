"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Newspaper, ShieldCheck, PenSquare, ArrowRight } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { getBlogs } from "@/services/blog.service";

import Loader from "@/components/Loader";
import BlogCard from "@/components/BlogCard";

export default function Dashboard() {
  const { user } = useAuth();

  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    getBlogs()
      .then((d) => setBlogs(d.blogs || d.data || d || []))
      .catch(() => setBlogs([]));
  }, []);

  if (!blogs) {
    return <Loader text="Loading dashboard..." />;
  }

  const name = user?.firstname || user?.name || "there";
  const recent = blogs.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold text-ink">Welcome, {name} 👋</h1>

      <p className="mt-1.5 text-slate-500">
        Here's a quick view of your blogApp account.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="card flex items-center gap-4 p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
            <Newspaper size={22} />
          </span>
          <div>
            <p className="text-sm text-slate-500">Total Blogs</p>
            <p className="mt-0.5 text-3xl font-bold text-ink">
              {blogs.length}
            </p>
          </div>
        </div>

        <div className="card flex items-center gap-4 p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-warning">
            <ShieldCheck size={22} />
          </span>
          <div>
            <p className="text-sm text-slate-500">Your Role</p>
            <p className="mt-0.5 text-3xl font-bold capitalize text-ink">
              {user?.role || "User"}
            </p>
          </div>
        </div>
      </div>

      <div className="card mt-6 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-ink">
            Ready to share something?
          </h2>
          <p className="mt-1.5 text-slate-500">
            Create and publish your next blog post.
          </p>
        </div>

        <Link href="/dashboard/blogs/create" className="button shrink-0">
          <PenSquare size={16} />
          Create Blog
        </Link>
      </div>

      {recent.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">Recent Blogs</h2>
            <Link
              href="/dashboard/blogs"
              className="flex items-center gap-1 text-sm font-semibold text-primary"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((b) => (
              <BlogCard key={b._id || b.id} blog={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
