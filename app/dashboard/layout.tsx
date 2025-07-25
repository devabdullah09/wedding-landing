"use client";
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ isAuthenticated: boolean; role: "superadmin" | "organizer"; email: string } | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("vesello_auth");
    if (auth) {
      const parsed = JSON.parse(auth);
      setUser(parsed);
    }
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <div className="flex min-h-[calc(100vh-5rem)] bg-white">
        <Sidebar role={user.role} />
        <main className="flex-1 p-12 bg-white min-h-full relative">
          {children}
        </main>
      </div>
    </div>
  );
} 