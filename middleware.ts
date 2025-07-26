import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // If user is logged in and trying to access the landing page, redirect to Home
  if (isLoggedIn && nextUrl.pathname === "/") {
    return Response.redirect(new URL("/Home", nextUrl));
  }

  // Let NextAuth handle the rest
  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
