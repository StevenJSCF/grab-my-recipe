"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignInModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg min-w-[300px] flex flex-col gap-4">
        <h2 className="text-lg font-semibold mb-2">Sign in to your account</h2>
        <Button variant="outline" onClick={() => signIn("google")}>
          Sign in with Google
        </Button>
        <Button variant="outline" onClick={() => signIn("github")}>
          Sign in with GitHub
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
