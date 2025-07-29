// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const protectedRoutes = [
//   "/UploadRecipe",
//   "/Recipes",
//   "/Favorites",
//   "/Settings",
//   "/Home",
//   // add more as needed
// ];

// export async function middleware(request: NextRequest): Promise<NextResponse> {
//   const { pathname } = request.nextUrl;

//   // Check if the route is protected
//   if (protectedRoutes.some((route) => pathname.startsWith(route))) {
//     const token = request.cookies.get("session")?.value ?? null;
//     if (!token) {
//       // Redirect to landing page if not authenticated
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   if (request.method === "GET") {
//     const response = NextResponse.next();
//     const token = request.cookies.get("session")?.value ?? null;
//     if (token !== null) {
//       // Only extend cookie expiration on GET requests since we can be sure
//       // a new session wasn't set when handling the request.
//       response.cookies.set("session", token, {
//         path: "/",
//         maxAge: 60 * 60 * 24 * 30,
//         sameSite: "lax",
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//       });
//     }
//     return response;
//   }

//   // CSRF protection
//   const originHeader = request.headers.get("Origin");
//   // NOTE: You may need to use `X-Forwarded-Host` instead
//   const hostHeader = request.headers.get("Host");
//   if (originHeader === null || hostHeader === null) {
//     return new NextResponse(null, {
//       status: 403,
//     });
//   }
//   let origin: URL;
//   try {
//     origin = new URL(originHeader);
//   } catch {
//     return new NextResponse(null, {
//       status: 403,
//     });
//   }
//   if (origin.host !== hostHeader) {
//     return new NextResponse(null, {
//       status: 403,
//     });
//   }
//   return NextResponse.next();
// }

// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

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
  if (!protectedRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("session")?.value;
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const [sessionId, sessionSecret] = sessionCookie.split("|");
  if (!sessionId || !sessionSecret) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const valid = await bcrypt.compare(sessionSecret, session.secretHash);
  if (!valid) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // All good
  return NextResponse.next();
}
