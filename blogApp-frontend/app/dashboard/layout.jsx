"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/Loader";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <>
        <Navbar />
        <Loader text="Loading your workspace..." />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="md:flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>
    </>
  );
}

