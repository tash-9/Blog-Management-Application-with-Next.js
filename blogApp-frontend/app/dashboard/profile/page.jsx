"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Camera, UploadCloud } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { updateProfile, uploadProfileImage } from "@/services/user.service";
import BackButton from "@/components/BackButton";

export default function Profile() {
  const { user, setUser, refreshProfile } = useAuth();

  const [form, setForm] = useState({ firstname: "", lastname: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setForm({
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
    });
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();

    setPending(true);
    setError("");

    try {
      const d = await updateProfile(form);

      setUser(d.user || d.data || { ...user, ...form });
      setMessage("Profile updated successfully.");
    } catch (e) {
      setError(e.message);
    } finally {
      setPending(false);
    }
  };

  const pickFile = (f) => {
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);

    if (f) {
      upload(f);
    }
  };

  const upload = async (f) => {
    const selected = f || file;

    if (!selected) {
      return setError("Please choose an image first.");
    }

    if (!selected.type.startsWith("image/") || selected.size > 5 * 1024 * 1024) {
      return setError("Choose an image under 5 MB.");
    }

    setError("");
    setPending(true);

    try {
      await uploadProfileImage(selected);
      await refreshProfile();

      setMessage("Profile image updated successfully.");
      setFile(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setPending(false);
    }
  };

  const avatar = preview || user?.profileImage || user?.image || user?.avatar;

  return (
    <div className="mx-auto max-w-3xl">
      <BackButton href="/dashboard" label="Back to Dashboard" />

      <h1 className="text-3xl font-bold text-ink">Profile</h1>
      <p className="mt-1.5 text-slate-500">
        Update your account details and profile image.
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

      <div className="card mt-7 p-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-primary-100 text-3xl font-bold text-primary ring-4 ring-primary-50">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                (user?.firstname || "U").charAt(0).toUpperCase()
              )}
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-primary shadow-card">
              <Camera size={14} />
            </span>
          </div>

          <div className="flex-1">
            <p className="font-semibold text-ink">Profile Image</p>
            <p className="mt-0.5 text-sm text-slate-500">
              JPG or PNG. Max size 5 MB.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="button cursor-pointer text-sm">
                <UploadCloud size={15} />
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={pending}
                  onChange={(e) => pickFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="card mt-6 p-6">
        <h2 className="text-xl font-bold text-ink">Personal Information</h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label>
            <span className="label">First Name</span>

            <input
              required
              className="field"
              value={form.firstname}
              onChange={(e) =>
                setForm({ ...form, firstname: e.target.value })
              }
            />
          </label>

          <label>
            <span className="label">Last Name</span>

            <input
              required
              className="field"
              value={form.lastname}
              onChange={(e) =>
                setForm({ ...form, lastname: e.target.value })
              }
            />
          </label>
        </div>

        <label className="mt-4 block">
          <span className="label">Email</span>

          <input
            readOnly
            className="field cursor-not-allowed bg-slate-50 text-slate-500"
            value={user?.email || ""}
          />
        </label>

        <p className="mt-3 text-sm text-slate-500">
          Role: <span className="capitalize">{user?.role || "User"}</span>
        </p>

        <button disabled={pending} className="button mt-5">
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}