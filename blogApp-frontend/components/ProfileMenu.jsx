"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, User, KeyRound, LogOut } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { user, signOut } = useAuth();

  const router = useRouter();

  const name =
    [user?.firstname, user?.lastname].filter(Boolean).join(" ") ||
    user?.name ||
    "User";

  const avatar = user?.profileImage || user?.image || user?.avatar;

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-sm font-medium transition hover:bg-slate-100"
      >
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary-100 font-semibold text-primary">
          {avatar ? (
            <img src={avatar} alt="" className="h-full w-full object-cover" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </span>

        <span className="hidden max-w-[8rem] truncate sm:inline">
          {name}
        </span>

        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="animate-fade-in absolute right-0 z-30 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-card-hover">
          <div className="px-3 py-2">
            <p className="truncate text-sm font-semibold text-ink">{name}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>

          <div className="my-1 h-px bg-slate-100" />

          <Link
            href="/dashboard/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <User size={16} className="text-slate-400" />
            Profile
          </Link>

          <Link
            href="/dashboard/change-password"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <KeyRound size={16} className="text-slate-400" />
            Change Password
          </Link>

          <div className="my-1 h-px bg-slate-100" />

          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-error hover:bg-red-50"
            onClick={() => {
              signOut();
              router.push("/login");
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
