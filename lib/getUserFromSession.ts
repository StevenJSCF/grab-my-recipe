import { cookies } from "next/headers";

export async function getUserFromSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;
  const [sessionId] = sessionCookie.split("|");
  if (!sessionId) return null;

  const prisma = (await import("@/lib/prisma")).default;
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });
  if (!session || !session.user) return null;
  return session.user;
}
