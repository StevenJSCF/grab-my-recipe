import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Get session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const [sessionId] = sessionCookie.split("|");
  if (!sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find session in DB
  const prisma = (await import("@/lib/prisma")).default;
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Only return safe user fields
  const { id, name, username } = session.user;
  return NextResponse.json({ user: { id, name, username } }, { status: 200 });
}
