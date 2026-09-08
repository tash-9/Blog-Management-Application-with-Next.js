"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, Sparkles } from "lucide-react";

import { register } from "@/services/auth.service";
import AuthShell from "@/components/AuthShell";

export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setPending(true);
    setError("");

    try {
      await register({
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        password: form.password,
      });

      router.push("/login");
    } catch (e) {
      setError(e.message);
    } finally {
      setPending(false);
    }
  };

  const input = (name, label, type = "text") => (
    <label className="block">
      <span className="label">{label}</span>

      <input
        required
        type={type}
        minLength={type === "password" ? 6 : undefined}
        className="field"
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
      />
    </label>
  );

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

        <h1 className="mt-6 text-2xl font-bold text-ink">
          Create your account
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Join blogApp and start publishing.
        </p>

        {error && (
          <p className="alert-error mt-5">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {error}
          </p>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {input("firstname", "First Name")}
          {input("lastname", "Last Name")}
        </div>

        <div className="mt-4 space-y-4">
          {input("email", "Email", "email")}
          {input("password", "Password", "password")}
          {input("confirmPassword", "Confirm Password", "password")}

          <button disabled={pending} className="button w-full">
            {pending ? "Creating..." : "Register"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already registered?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
