"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Users as UsersIcon, ShieldCheck } from "lucide-react";

import { getUsers, setUserStatus } from "@/services/user.service";

import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import UserDetailModal from "@/components/UserDetailModal";
import BackButton from "@/components/BackButton";

export default function Users() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [viewingId, setViewingId] = useState(null);

  const load = () =>
    getUsers()
      .then((d) => setUsers(d.users || d.data || d || []))
      .catch((e) => {
        setError(e.message);
        setUsers([]);
      });

  // admin/layout.jsx already guarantees only an authenticated admin reaches
  // this component, so this effect just loads the data
  useEffect(() => {
    load();
  }, []);

  const toggle = async (x) => {
    const id = x._id || x.id;

    setBusyId(id);

    try {
      await setUserStatus(id, !x.isActive);

      setUsers(
        users.map((u) =>
          (u._id || u.id) === id ? { ...u, isActive: !x.isActive } : u
        )
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setBusyId(null);
    }
  };

  if (!users) {
    return <Loader text="Loading users..." />;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <BackButton href="/dashboard" label="Back to Dashboard" />

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
          <UsersIcon size={20} />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-ink">Users</h1>
          <p className="mt-0.5 text-slate-500">
            Manage user accounts and access.
          </p>
        </div>
      </div>

      {error && (
        <p className="alert-error mt-5">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}

      <div className="card mt-7 overflow-hidden">
        {users.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="p-4 font-semibold">User</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((x) => {
                  const id = x._id || x.id;
                  const isAdminRow = String(x.role || "").toLowerCase() === "admin";

                  return (
                    <tr
                      key={id}
                      className="border-t border-slate-100 transition hover:bg-slate-50/60"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 text-xs font-semibold text-primary">
                            {(x.profileImage || x.image) ? (
                              <img
                                src={x.profileImage || x.image}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              (x.firstname || x.name || "U").charAt(0).toUpperCase()
                            )}
                          </div>
                          <span className="font-semibold text-ink">
                            {[x.firstname, x.lastname].filter(Boolean).join(" ") ||
                              x.name}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-slate-600">{x.email}</td>

                      <td className="p-4">
                        {isAdminRow ? (
                          <span className="badge-admin">
                            <ShieldCheck size={12} />
                            Admin
                          </span>
                        ) : (
                          <span className="capitalize text-slate-600">
                            {x.role || "User"}
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <span
                          className={x.isActive ? "badge-active" : "badge-inactive"}
                        >
                          {x.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setViewingId(id)}
                            className="rounded-lg px-2.5 py-1.5 text-sm font-semibold text-primary hover:bg-primary-50"
                          >
                            View
                          </button>

                          <button
                            onClick={() => toggle(x)}
                            disabled={busyId === id}
                            className={
                              x.isActive
                                ? "button-ghost-danger"
                                : "rounded-lg px-2.5 py-1.5 text-sm font-semibold text-primary hover:bg-primary-50"
                            }
                          >
                            {busyId === id
                              ? "Updating..."
                              : x.isActive
                                ? "Deactivate"
                                : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={UsersIcon} title="No users found" />
        )}
      </div>

      <UserDetailModal userId={viewingId} onClose={() => setViewingId(null)} />
    </div>
  );
}