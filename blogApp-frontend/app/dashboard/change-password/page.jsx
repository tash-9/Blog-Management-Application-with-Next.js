"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, KeyRound } from "lucide-react";

import { changePassword } from "@/services/user.service";
import BackButton from "@/components/BackButton";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return setError("Passwords do not match.");
    }

    setPending(true);
    setError("");
    setMessage("");

    try {
      const d = await changePassword(password);

      setMessage(d.message || "Password changed successfully.");
      setPassword("");
      setConfirm("");
    } catch (e) {
      setError(e.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <BackButton href="/dashboard" label="Back to Dashboard" />

      <form onSubmit={submit} className="card p-6 sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
          <KeyRound size={20} />
        </span>

        <h1 className="mt-4 text-2xl font-bold text-ink">Change Password</h1>
        <p className="mt-1 text-sm text-slate-500">
          Choose a strong new password for your account.
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
            <span className="label">Confirm New Password</span>

            <input
              required
              minLength="6"
              type="password"
              className="field"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>

          <button disabled={pending} className="button">
            {pending ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
}