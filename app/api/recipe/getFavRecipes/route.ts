import { NextRequest, NextResponse } from "next/server";
import { getRecipes } from "@/lib/db/actions/recipes.action";

//api/recipe/getFavRecipes
export async function GET(req: NextRequest) {
  //   const userId = req.nextUrl.searchParams.get("userId");
  //   if (!userId) {
  //     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  //   }

  const recipes = await getRecipes({ favorite: true });
  return NextResponse.json({ recipes }, { status: 200 });
}
