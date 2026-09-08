"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";

import { getBlog } from "@/services/blog.service";

export default function BlogDetails({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlog(params.id)
      .then((d) => setBlog(d.blog || d.data || d))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader text="Loading blog..." />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />

        <main className="container-page py-20">
          <EmptyState
            icon={FileQuestion}
            title="Blog Not Found"
            description="The blog you are looking for does not exist or may have been removed."
          />

          <div className="mt-2 text-center">
            <Link href="/" className="button">
              <ArrowLeft size={16} />
              Back to blogs
            </Link>
          </div>
        </main>
      </>
    );
  }

  const author = blog.author || blog.user || {};

  return (
    <>
      <Navbar />

      <article className="container-page max-w-3xl py-14">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary"
        >
          <ArrowLeft size={15} />
          Back to blogs
        </Link>

        <span className="badge-category">{blog.category}</span>

        <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          {blog.blogTitle || blog.title}
        </h1>

        <div className="mt-6 flex items-center gap-3 border-y border-slate-100 py-4 text-sm text-slate-600">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-primary-100 text-primary">
            {(author.profileImage || author.image) ? (
              <img
                className="h-full w-full object-cover"
                src={author.profileImage || author.image}
                alt=""
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-semibold">
                {(author.firstname || "A").charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <p className="font-semibold text-ink">
              {[author.firstname, author.lastname].filter(Boolean).join(" ") ||
                author.name ||
                "Unknown author"}
            </p>
            <time className="text-xs text-slate-500">
              {blog.createdAt &&
                new Date(blog.createdAt).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
            </time>
          </div>
        </div>

        <div className="mt-8 whitespace-pre-wrap text-lg leading-8 text-slate-700">
          {blog.blog || blog.content}
        </div>
      </article>
    </>
  );
}
