import React from "react";
import { SidebarNav } from "@/components/sidebar-nav";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <main className="flex-1 ml-0 md:ml-16 lg:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
