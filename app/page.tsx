import LandingPage from "./LandingPage";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  // If user is authenticated, redirect to Home
  if (session?.user) {
    redirect("/Home");
  }

  return (
    <main>
      <LandingPage />
    </main>
  );
}
