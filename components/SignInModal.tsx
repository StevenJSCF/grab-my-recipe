"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignInModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/user/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setUsername("");
        setPassword("");
        setError(null);
        onClose();
        router.push("/Home");
      } else {
        const data = await res.json();
        setError(data.error || "Sign in failed.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg min-w-[300px] flex flex-col gap-4">
        <h2 className="text-lg font-semibold mb-2">Sign in to your account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            className="border rounded px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" variant="default" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="flex flex-col gap-2 mt-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
