"use client";
import React, { useEffect, useState } from "react";
import { getUserFromSession } from "@/lib/getUserFromSession";

export default function SettingsPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user/getUserById");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-3xl text-center">Unauthorized</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center gap-4">
        <div className="text-lg">
          Hey <span className="font-semibold">{user.name}</span>, you are signed
          in.
        </div>
        <button
          onClick={async () => {
            await fetch("/api/user/log-out", { method: "POST" });
            window.location.href = "/";
          }}
          className="mt-6 bg-orange-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
