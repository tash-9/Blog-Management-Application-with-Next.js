import Link from "next/link";
import { Sparkles, Quote } from "lucide-react";

export default function AuthShell({ children }) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-hover p-10 text-white lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-10 h-80 w-80 rounded-full bg-white/10"
        />

        <Link href="/" className="relative z-10 flex items-center gap-2 text-xl font-extrabold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
            <Sparkles size={17} strokeWidth={2.5} />
          </span>
          blogApp
        </Link>

        <div className="relative z-10 max-w-sm">
          <Quote size={28} className="text-white/40" />
          <p className="mt-3 text-xl font-medium leading-snug">
            A space to publish, discover, and manage ideas worth sharing.
          </p>
          <p className="mt-4 text-sm text-white/70">
            Browse blogs across every topic — from programming to lifestyle —
            or start writing your own.
          </p>
        </div>

        <p className="relative z-10 text-xs text-white/60">
          © {new Date().getFullYear()} blogApp. All rights reserved.
        </p>
      </div>

      <div className="flex items-center justify-center bg-slate-50 p-4 py-12">
        {children}
      </div>
    </main>
  );
}
