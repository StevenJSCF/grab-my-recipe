import prisma from "@/lib/prisma";
import { getUserFromSession } from "@/lib/getUserFromSession";

export async function DELETE() {
  const sessionData = await getUserFromSession();
  if (!sessionData) return new Response("Unauthorized", { status: 401 });

  const { user, sessionId } = sessionData;
  console.log("Logging out user:", user);

  try {
    await prisma.session.delete({ where: { id: sessionId } });
  } catch (err) {
    // Session may already be deleted, ignore error
  }

  const response = new Response("Logged out", { status: 200 });
  response.headers.set("Set-Cookie", `session=; Path=/; Max-Age=0`);
  return response;
}
