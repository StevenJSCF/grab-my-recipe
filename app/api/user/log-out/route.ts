import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/session=([^;]+)/);
  if (!match) return new Response("No session", { status: 400 });

  const [sessionId] = match[1].split("|");

  await prisma.session.delete({ where: { id: sessionId } });

  const response = new Response("Logged out", { status: 200 });
  response.headers.set("Set-Cookie", `session=; Path=/; Max-Age=0`);
  return response;
}
