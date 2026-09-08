"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Sparkles, SearchX } from "lucide-react";

import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import Loader from "@/components/Loader";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import EmptyState from "@/components/EmptyState";

import { getBlogs } from "@/services/blog.service";

export default function Home() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(new URLSearchParams(window.location.search).get("title") || "");
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const data = await getBlogs({ title, category });

        setBlogs(data.blogs || data.data || data || []);
        setError("");
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [title, category]);

  return (
    <>
      <Navbar />

      <section className="border-b border-slate-200 bg-gradient-to-b from-primary-50/70 to-slate-50">
        <div className="container-page py-16 text-center sm:py-20">
          <span className="badge-category mx-auto">
            <Sparkles size={13} />
            All your blog in one place
          </span>

          <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Ideas worth sharing.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Discover practical perspectives on technology, programming,
            design, business, lifestyle, and everything in between.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <SearchBar value={title} onChange={setTitle} />
            <CategoryFilter value={category} onChange={setCategory} />
          </div>
        </div>
      </section>

      <main className="container-page py-12">
        {error ? (
          <p className="alert-error mx-auto max-w-xl">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {error}
          </p>
        ) : loading ? (
          <Loader text="Loading blogs..." />
        ) : blogs.length ? (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id || blog.id} blog={blog} />
            ))}
          </section>
        ) : (
          <EmptyState
            icon={SearchX}
            title="No blogs found"
            description="Try a different search term or category."
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="container-page flex flex-col items-center gap-2 text-center text-sm text-slate-500 sm:flex-row sm:justify-between">
          <span className="font-semibold text-ink">
            blog<span className="text-primary">App</span>
          </span>
          <span>© {new Date().getFullYear()} blogApp. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
