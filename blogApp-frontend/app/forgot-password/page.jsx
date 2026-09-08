"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";

import { forgotPassword } from "@/services/auth.service";
import AuthShell from "@/components/AuthShell";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    setPending(true);
    setError("");

    try {
      const d = await forgotPassword(email);

      setMessage(
        d.message || "If that email exists, a reset link has been sent."
      );
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
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary"
        >
          <ArrowLeft size={15} />
          Back to login
        </Link>

        <h1 className="mt-5 text-2xl font-bold text-ink">
          Forgot password?
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Enter your email and we will send a password reset link.
        </p>

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

        <label className="mt-5 block">
          <span className="label">Email</span>

          <input
            required
            type="email"
            className="field"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <button disabled={pending} className="button mt-5 w-full">
          {pending ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </AuthShell>
  );
}
