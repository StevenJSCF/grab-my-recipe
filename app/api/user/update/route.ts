import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { updateUser } from "@/lib/db/actions/user.action";

export const PUT = async (request: Request) => {
  const { id, data } = await request.json();

  // If username is being updated, check for uniqueness
  if (data.username) {
    const existing = await prisma.user.findFirst({
      where: {
        username: data.username,
        NOT: { id },
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }
  }

  const user = await updateUser(id, data);
  return NextResponse.json(user);
};
