"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from '@/components/layout/Header';
import Footer from "@/components/layout/Footer";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  return (
    <>
      {!isDashboard && <Header />}
      <main className={!isDashboard ? "pt-20" : undefined}>{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
} 