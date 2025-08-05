import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GrabMyRecipe - Turn YouTube cooking chaos into Perfect, Clear, Readable Recipes",
  description:
    "Upload recipe screenshots and automatically extract ingredients with OCR. Save, organize, and access your favorite recipes anytime.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" />
              {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
