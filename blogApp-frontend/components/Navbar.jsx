"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X, Sparkles } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();

    router.push(`/?title=${encodeURIComponent(search)}`);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight text-ink"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <Sparkles size={17} strokeWidth={2.5} />
          </span>
          blog<span className="text-primary">App</span>
        </Link>

        <form
          onSubmit={submit}
          className="mx-auto hidden max-w-md flex-1 md:block"
        >
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              className="w-full rounded-xl border border-transparent bg-slate-100 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary-100"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          {user ? (
            <ProfileMenu />
          ) : (
            <>
              <Link
                href="/login"
                className="button-secondary px-4 py-2 text-sm"
              >
                Login
              </Link>

              <Link href="/register" className="button px-4 py-2 text-sm">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="animate-fade-in border-t border-slate-200 bg-white p-4 md:hidden">
          <form onSubmit={submit} className="relative mb-3">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {user ? (
            <div onClick={() => setMobileOpen(false)}>
              <ProfileMenu />
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="button-secondary flex-1 py-2 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="button flex-1 py-2 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
