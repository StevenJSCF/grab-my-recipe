"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SignInModal from "@/components/SignInModal";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/Home"); // ✅ Safe and conditional
    }
  }, [session, router]);

  if (status === "loading") return null;

  if (!session) {
    return (
      <>
        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
          Sign In
        </Button>
        <SignInModal open={open} onClose={() => setOpen(false)} />
      </>
    );
  }

  return null; // ✅ Prevent double rendering or crashes
}
