"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";

export default function SettingsPage() {
  const { data: session, status } = useSession();

  // Helper to guess provider name from user image or email
  function getProviderName(user: any) {
    if (!user) return "your provider";
    if (user.image && typeof user.image === "string") {
      if (user.image.includes("googleusercontent")) return "Google";
      if (user.image.includes("githubusercontent")) return "GitHub";
    }
    if (user.email && typeof user.email === "string") {
      if (user.email.endsWith("@gmail.com")) return "Google";
      if (user.email.endsWith("@users.noreply.github.com")) return "GitHub";
    }
    return "your provider";
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-3xl text-center">Unauthorized</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center gap-4">
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name + " profile"}
            className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-xl mb-2"
          />
        )}
        <div className="text-lg">
          Hey <span className="font-semibold">{session.user.name}</span>, you
          are signed in with{" "}
          <span className="font-semibold">{getProviderName(session.user)}</span>{" "}
          as:
        </div>
        <div className="text-md text-gray-700 dark:text-gray-300 font-mono">
          {session.user.email}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-6 bg-orange-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
