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

  // return (
  //   <div className="flex items-center gap-2">
  //     {session.user?.image && (
  //       <Image
  //         width={32}
  //         height={32}
  //         src={session.user.image}
  //         alt="?"
  //         className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700"
  //       />
  //     )}
  //     <Button size="sm" variant="outline" onClick={() => signOut()}>
  //       Sign Out
  //     </Button>
  //   </div>
  // );
}
