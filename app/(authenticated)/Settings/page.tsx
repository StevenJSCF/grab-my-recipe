"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/user/getUserById");
      if (!res.ok) return null;
      const data = await res.json();
      return data.user;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (user) {
      setEditName(user.name || "");
      setEditUsername(user.username || "");
    }
  }, [user]);

  if (isLoading) {
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
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center gap-4 min-w-[320px]">
        <div className="text-lg mb-2">
          Hey <span className="font-semibold">{user.name}</span>, you are signed
          in.
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Yeah, no kidding
        </div>
        </div>
       
        <form
          className="flex flex-col gap-3 w-full"
          onSubmit={async (e) => {
            e.preventDefault();
            setSaving(true);
            setError("");
            try {
              const res = await fetch("/api/user/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: user.id,
                  data: { username: editUsername, name: editName },
                }),
              });
              if (res.ok) {
                toast.success("Profile updated!");
                queryClient.setQueryData(["user"], (prev: any) =>
                  prev
                    ? { ...prev, name: editName, username: editUsername }
                    : prev
                );
              } else {
                const data = await res.json();
                setError(data.error || "Failed to update profile");
              }
            } catch (err) {
              setError("Failed to update profile");
            }
            setSaving(false);
          }}
        >
          <label className="font-medium">Name (display)</label>
          <input
            className="border rounded px-3 py-2"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />
          <label className="font-medium">Username (login)</label>
          <input
            className="border rounded px-3 py-2"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg shadow"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
        <button
          onClick={async () => {
            await fetch("/api/user/log-out", { method: "DELETE" });
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
