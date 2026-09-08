"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, Sparkles } from "lucide-react";

import { login } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";
import AuthShell from "@/components/AuthShell";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const { signIn } = useAuth();
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    setPending(true);
    setError("");

    try {
      const data = await login(form);

      const token = data.token || data.accessToken || data.data?.token;

      if (!token) {
        throw new Error("No authentication token was returned.");
      }

      await signIn(token);
      router.push("/dashboard");
    } catch (e) {
      setError(e.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthShell>
      <form onSubmit={submit} className="card w-full max-w-md p-7 sm:p-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold text-ink lg:hidden"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <Sparkles size={17} strokeWidth={2.5} />
          </span>
          blog<span className="text-primary">App</span>
        </Link>

        <h1 className="mt-6 text-2xl font-bold text-ink">Welcome back</h1>

        <p className="mt-1 text-sm text-slate-500">
          Log in to manage your blogs.
        </p>

        {error && (
          <p className="alert-error mt-5">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {error}
          </p>
        )}

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="label">Email</span>

            <input
              required
              type="email"
              className="field"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="label">Password</span>

            <input
              required
              type="password"
              minLength="6"
              className="field"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </label>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary"
            >
              Forgot Password?
            </Link>
          </div>

          <button disabled={pending} className="button w-full">
            {pending ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          New here?{" "}
          <Link href="/register" className="font-semibold text-primary">
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
