"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, KeyRound } from "lucide-react";

import { resetPassword } from "@/services/auth.service";
import AuthShell from "@/components/AuthShell";

export default function ResetPassword({ params }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!done) return;

    const timer = setTimeout(() => router.push("/login"), 2000);
    return () => clearTimeout(timer);
  }, [done, router]);

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return setError("Passwords do not match.");
    }

    setPending(true);
    setError("");

    try {
      await resetPassword(params.token, password);
      setDone(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setPending(false);
    }
  };

  if (done) {
    return (
      <AuthShell>
        <div className="card w-full max-w-md p-7 text-center sm:p-8">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-success">
            <CheckCircle2 size={20} />
          </span>

          <h1 className="mt-4 text-2xl font-bold text-ink">
            Password successfully changed.
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Redirecting you to login...
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <form onSubmit={submit} className="card w-full max-w-md p-7 sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
          <KeyRound size={20} />
        </span>

        <h1 className="mt-4 text-2xl font-bold text-ink">Reset password</h1>

        <p className="mt-1 text-sm text-slate-500">
          Choose a new password for your account.
        </p>

        {error && (
          <p className="alert-error mt-5">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {error}
          </p>
        )}

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="label">New Password</span>

            <input
              required
              minLength="6"
              type="password"
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="label">Confirm Password</span>

            <input
              required
              minLength="6"
              type="password"
              className="field"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>

          <button disabled={pending} className="button w-full">
            {pending ? "Resetting..." : "Reset Password"}
          </button>
        </div>

        <Link
          href="/login"
          className="mt-5 block text-center text-sm font-medium text-primary"
        >
          Back to login
        </Link>
      </form>
    </AuthShell>
  );
}