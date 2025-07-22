import { NextResponse } from "next/server";
import { getUserById } from "@/lib/db/actions/user.action";
import { auth } from "@/auth";

export async function GET(request: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  const user = await getUserById(userId);
  return NextResponse.json({ user }, { status: 200 });
}
