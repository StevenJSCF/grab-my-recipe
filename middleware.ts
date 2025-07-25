import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = [
  "/UploadRecipe",
  "/Recipes",
  "/Favorites",
  "/Settings",
  "/Home",
  // add more as needed
];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const session = await auth();
    if (!session) {
      // Redirect to landing page if not authenticated
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
