import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  // Check if email exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  }

  // Create user
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // Create session
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
