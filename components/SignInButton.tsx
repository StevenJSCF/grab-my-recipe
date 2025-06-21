"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions/auth";

export default function SignInButton() {
  return (
    <Button
      onClick={() => login()}
      size="sm"
      variant="outline"
      className="border-gray-300 dark:border-gray-700"
    >
      Sign In
    </Button>
  );
}
