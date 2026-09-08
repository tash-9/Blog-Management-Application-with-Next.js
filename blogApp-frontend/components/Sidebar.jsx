"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  Newspaper,
  PenSquare,
  Users,
  UserCircle,
  KeyRound,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const admin = String(user?.role || "").toLowerCase() === "admin";

  const links = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/blogs",
      label: admin ? "All Blogs" : "My Blogs",
      icon: Newspaper,
    },
    {
      href: "/dashboard/blogs/create",
      label: "Create Blog",
      icon: PenSquare,
    },
    ...(admin
      ? [
          {
            href: "/admin/users",
            label: "Users",
            icon: Users,
          },
        ]
      : []),
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: UserCircle,
    },
    {
      href: "/dashboard/change-password",
      label: "Change Password",
      icon: KeyRound,
    },
  ];

  return (
    <aside className="w-full shrink-0 border-b border-slate-200 bg-white md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-64 md:border-b-0 md:border-r">
      <nav className="scrollbar-thin flex gap-1 overflow-x-auto p-3 md:flex-col md:overflow-x-visible md:p-4">
        {links.map((l) => {
          const Icon = l.icon;
          const active = path === l.href;

          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-primary-50 text-primary"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={active ? 2.4 : 2}
                className={active ? "text-primary" : "text-slate-400"}
              />
              {l.label}
            </Link>
          );
        })}

        <div className="my-2 hidden h-px bg-slate-100 md:block" />

        <button
          onClick={() => {
            signOut();
            router.push("/login");
          }}
          className="flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-error hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </aside>
  );
}