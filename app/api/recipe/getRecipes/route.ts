import { NextResponse } from "next/server";
import { getRecipes } from "@/lib/db/actions/recipes.action";

export async function GET() {
//   const userId = req.nextUrl.searchParams.get("userId");
//   if (!userId) {
//     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
//   }
  const recipes = await getRecipes();
  return NextResponse.json({ recipes }, { status: 200 });
}