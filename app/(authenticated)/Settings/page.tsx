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
  const [showModal, setShowModal] = useState(false);

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

  async function handleIconChange(gender: "male" | "female") {
    setShowModal(false);
    setSaving(true);
    setError("");
    try {
      const newImage = user.image.replace(/male|female/, gender);
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          data: { image: newImage },
        }),
      });
      if (res.ok) {
        toast.success("Profile image updated!");
        queryClient.setQueryData(["user"], (prev: any) =>
          prev ? { ...prev, image: newImage } : prev
        );
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update profile image");
      }
    } catch (err) {
      setError("Failed to update profile image" + (err ? `: ${err}` : ""));
    }
    setSaving(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-4 min-w-[320px]">
        <div className="text-lg mb-2">
          Hey <span className="font-semibold">{user.name}</span>, you are signed
          in.
          <div className="text-sm text-gray-500 text-center">
            Yeah, no kidding
          </div>
        </div>
        {user.image && (
          <div className="flex justify-center mb-2">
            <img
              src={`/profile-pics/${user.image}`}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-orange-500 object-cover cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          </div>
        )}

        {/* Modal for choosing female icon */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.3)" }}
          >
            <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 flex flex-col items-center relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Choose Your Avatar
              </h2>
              <div className="flex gap-6">
                {/* Female Icon */}
                <img
                  src={`/profile-pics/${user.image.replace(
                    /male|female/,
                    "female"
                  )}`}
                  alt="Female Icon"
                  className="w-24 h-24 rounded-full border-4 border-orange-500 object-cover cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleIconChange("female")}
                />

                {/* Male Icon */}
                <img
                  src={`/profile-pics/${user.image.replace(
                    /male|female/,
                    "male"
                  )}`}
                  alt="Male Icon"
                  className="w-24 h-24 rounded-full border-4 border-orange-500 object-cover cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleIconChange("male")}
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </div>
          </div>
        )}

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
              setError("Failed to update profile" + (err ? `: ${err}` : ""));
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
