import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  const user = await getSession(req);
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(JSON.stringify({ email: user.email }));
}
