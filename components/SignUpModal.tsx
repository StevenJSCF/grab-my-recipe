"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SignUpModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email || !password || !confirm || !name) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/user/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      if (res.ok) {
        setSuccess(true);
        setEmail("");
        setPassword("");
        setConfirm("");
        setName("");
      } else {
        const data = await res.json();
        setError(data.error || "Sign up failed.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg min-w-[320px] flex flex-col gap-4">
        <h2 className="text-lg font-semibold mb-2">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            className="border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border rounded px-3 py-2"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && (
            <div className="text-green-600 text-sm">Sign up successful!</div>
          )}
          <div className="flex gap-2 mt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
