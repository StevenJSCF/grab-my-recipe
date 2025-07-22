"use client";

import type React from "react";
import { useState } from "react";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { SidebarNav } from "@/components/sidebar-nav";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize QueryClient for React Query
  const [queryClient] = useState(() => new QueryClient());
  const { data: session } = useSession();

  // const session = await auth();
  if (!session) {
    return redirect("/");
  }
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster position="top-center" />

        <div className="flex min-h-screen bg-gray-50">
          <SidebarNav />
          <main className="flex-1 md:ml-16 lg:ml-64 p-4">
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </main>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}
