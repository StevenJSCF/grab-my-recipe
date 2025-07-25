"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SignInModal from "@/components/SignInModal";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (session) {
  //     console.log("User is authenticated:", session);
  //     router.push("/Home"); // ✅ Safe and conditional
  //   }
  // }, [session, router]);

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
