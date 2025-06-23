"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            GrabMyRecipe
          </span>
        </div>
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="#features" className="hover:underline">
            Features
          </Link>
          <Link href="#about" className="hover:underline">
            About
          </Link>
          <AuthButton />
          <ThemeToggle />
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg flex flex-col gap-2 p-4 animate-in fade-in slide-in-from-top-2">
          <Link href="/" className="py-2" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link
            href="#features"
            className="py-2"
            onClick={() => setOpen(false)}
          >
            Features
          </Link>
          <Link href="#about" className="py-2" onClick={() => setOpen(false)}>
            About
          </Link>
          <AuthButton />
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}
