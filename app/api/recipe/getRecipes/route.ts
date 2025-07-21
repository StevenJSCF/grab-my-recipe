import { NextResponse } from "next/server";
import { getRecipes } from "@/lib/db/actions/recipes.action";
import { auth } from "@/auth";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
  const recipes = await getRecipes();
  return NextResponse.json({ recipes }, { status: 200 });
}

