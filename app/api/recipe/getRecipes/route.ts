
import { NextResponse } from "next/server";
import { getRecipes } from "@/lib/db/actions/recipes.action";
import { getUserFromSession } from "@/lib/getUserFromSession";

export async function GET() {
  const user = await getUserFromSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const recipes = await getRecipes(user.id);
  return NextResponse.json({ recipes }, { status: 200 });
}
