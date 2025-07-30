"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SignInModal from "@/components/SignInModal";

export default function AuthButton() {
  // Check if the user is logged in or not
  const [open, setOpen] = useState(false);

  // if (status === "loading") return null;
    return (
      <>
        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
          Log In
        </Button>
        <SignInModal open={open} onClose={() => setOpen(false)} />
      </>
    );
}
