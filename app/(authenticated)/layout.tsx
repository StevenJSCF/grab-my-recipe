"use client";

import type React from "react";
import { useState, useEffect } from "react";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider, useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarNav } from "@/components/sidebar-nav";
import { useRouter } from "next/router";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("User is unauthenticated, redirecting to LandingPage");
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") return null;

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
