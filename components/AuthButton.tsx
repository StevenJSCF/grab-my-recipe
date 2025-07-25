"use client";
import { useSession, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SignInModal from "@/components/SignInModal";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (session) {
  //     console.log("User is authenticated:", session);
  //     console.log("session", session);
  //     console.log("status", status);

  //     router.replace("/Home"); // Redirect to Home when authenticated
  //   }
  // }, [session, router]);


  useEffect(() => {
  if (!session) {
    getSession().then((newSession) => {
      if (newSession) {
        console.log("Force refetched session:", newSession);
        router.push("/Home");
      }
    });
  } else {
    console.log("Session exists:", session);
    router.push("/Home");
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
