import { NextResponse, NextRequest } from "next/server";
import { deleteRecipe } from "@/lib/db/actions/recipes.action";


export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // Delete the recipe from the database
  await deleteRecipe(id);
  return NextResponse.json({ message: "Recipe deleted successfully" }, { status: 200 });
}