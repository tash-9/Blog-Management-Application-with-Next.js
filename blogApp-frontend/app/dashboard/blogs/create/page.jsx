"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

import BlogForm from "@/components/BlogForm";
import BackButton from "@/components/BackButton";

import { createBlog } from "@/services/blog.service";

export default function CreatePage() {
  const router = useRouter();

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (data) => {
    setPending(true);
    setError("");

    try {
      await createBlog(data);
      router.push("/dashboard/blogs");
    } catch (e) {
      setError(e.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <BackButton href="/dashboard/blogs" label="Back to Blogs" />
      </div>

      <BlogForm onSubmit={submit} pending={pending} />

      {error && (
        <p className="alert-error mx-auto mt-4 max-w-3xl">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </>
  );
}