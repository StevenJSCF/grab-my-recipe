import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const sessionId = crypto.randomUUID();
  const sessionSecret = randomBytes(32).toString("hex");
  const secretHash = await bcrypt.hash(sessionSecret, 12);

  await prisma.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      secretHash,
    },
  });

  const sessionToken = `${sessionId}|${sessionSecret}`;

  const res = NextResponse.json({ user });
  res.cookies.set("session", sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  return res;
}
