"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

import { getBlog, updateBlog } from "@/services/blog.service";

import BlogForm from "@/components/BlogForm";
import Loader from "@/components/Loader";
import BackButton from "@/components/BackButton";

export default function EditPage({ params }) {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getBlog(params.id)
      .then((d) => setBlog(d.blog || d.data || d))
      .catch((e) => setError(e.message));
  }, [params.id]);

  const submit = async (data) => {
    setPending(true);
    setError("");

    try {
      await updateBlog(params.id, data);
      router.push("/dashboard/blogs");
    } catch (e) {
      setError(e.message);
    } finally {
      setPending(false);
    }
  };

  if (error && !blog) {
    return (
      <div className="mx-auto max-w-3xl">
        <BackButton href="/dashboard/blogs" label="Back to Blogs" />

        <p className="alert-error">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      </div>
    );
  }

  if (!blog) {
    return <Loader text="Loading blog..." />;
  }

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <BackButton href="/dashboard/blogs" label="Back to Blogs" />
      </div>

      <BlogForm initial={blog} onSubmit={submit} pending={pending} />

      {error && (
        <p className="alert-error mx-auto mt-4 max-w-3xl">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </>
  );
}