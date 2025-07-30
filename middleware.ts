// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Define which routes should be protected
const protectedRoutes = [
  "/UploadRecipe",
  "/Recipes",
  "/Favorites",
  "/Settings",
  "/Home",
  // add more as needed
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run on protected routes
  if (!protectedRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("session")?.value;
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Optionally, check format (e.g. sessionId|sessionSecret)
  const [sessionId, sessionSecret] = sessionCookie.split("|");
  if (!sessionId || !sessionSecret) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Do NOT validate session in middleware (Edge runtime can't use Prisma/bcrypt)
  // Do validation in API routes or server actions instead

  return NextResponse.next();
}
