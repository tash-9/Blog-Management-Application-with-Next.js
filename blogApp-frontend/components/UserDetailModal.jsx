"use client";

import { useEffect, useState } from "react";
import { X, AlertCircle, ShieldCheck } from "lucide-react";

import { getUser } from "@/services/user.service";
import Loader from "./Loader";

export default function UserDetailModal({ userId, onClose }) {
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    setDetail(null);
    setError("");

    getUser(userId)
      .then((d) => setDetail(d.user || d.data || d))
      .catch((e) => setError(e.message));
  }, [userId]);

  if (!userId) {
    return null;
  }

  const isAdminRow = String(detail?.role || "").toLowerCase() === "admin";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="animate-fade-in w-full max-w-sm rounded-2xl bg-white p-6 shadow-card-hover">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-bold text-ink">User Details</h2>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <p className="alert-error mt-4">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {error}
          </p>
        )}

        {!detail && !error && <Loader text="Loading user..." />}

        {detail && (
          <div className="mt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 text-lg font-semibold text-primary">
                {detail.profileImage ? (
                  <img
                    src={detail.profileImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  (detail.firstname || "U").charAt(0).toUpperCase()
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-ink">
                  {[detail.firstname, detail.lastname]
                    .filter(Boolean)
                    .join(" ")}
                </p>
                <p className="truncate text-sm text-slate-500">
                  {detail.email}
                </p>
              </div>
            </div>

            <dl className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Role</dt>
                <dd>
                  {isAdminRow ? (
                    <span className="badge-admin">
                      <ShieldCheck size={12} />
                      Admin
                    </span>
                  ) : (
                    <span className="capitalize text-slate-700">
                      {detail.role || "User"}
                    </span>
                  )}
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Status</dt>
                <dd>
                  <span
                    className={
                      detail.isActive ? "badge-active" : "badge-inactive"
                    }
                  >
                    {detail.isActive ? "Active" : "Inactive"}
                  </span>
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Created</dt>
                <dd className="text-slate-700">
                  {detail.createdAt &&
                    new Date(detail.createdAt).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}