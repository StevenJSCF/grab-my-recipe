import LandingPage from "@/components/LandingPage";
import { auth } from "@/auth";

export default function Home() {

  const session = await auth();
  return (
    <div>
      <LandingPage />
    </div>
  );
}
function auth() {
  throw new Error("Function not implemented.");
}

