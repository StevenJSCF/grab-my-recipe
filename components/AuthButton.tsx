"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SignInModal from "@/components/SignInModal";
import { redirect } from "next/navigation";

export default function AuthButton() {
  // Check if the user is logged in or not
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

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

  return (redirect("/Home"));

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
