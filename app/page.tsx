import LandingPage from "./LandingPage";

export default function Page() {
  // const { data: session, status } = useSession();

  // if (status === "authenticated" && session.user) {
  //   console.log("user is authenticated", session.user);
  //   return <p>Signed in as {session.user.email}</p>;
  // }

  return (
    <main>
      <LandingPage />
    </main>
  );
}
