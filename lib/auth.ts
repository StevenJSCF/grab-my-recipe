// lib/auth.ts
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes as nodeRandomBytes } from "crypto";

export async function getSession(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/session=([^;]+)/);
  if (!match) return null;

  const [sessionId, sessionSecret] = match[1].split("|");
  if (!sessionId || !sessionSecret) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) return null;

  const isValid = await bcrypt.compare(sessionSecret, session.secretHash);
  if (!isValid) return null;

  return session.user;
}

export async function createSession(userId: string) {
  const sessionId = crypto.randomUUID();
  const sessionSecret = randomBytes(32).toString("hex");
  const sessionSecretHash = await bcrypt.hash(sessionSecret, 12);

  await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      secretHash: sessionSecretHash,
    },
  });

  return `${sessionId}|${sessionSecret}`;
}

export async function deleteSession(sessionId: string) {
  await prisma.session.delete({ where: { id: sessionId } });
}
function randomBytes(size: number) {
    return nodeRandomBytes(size);
}

