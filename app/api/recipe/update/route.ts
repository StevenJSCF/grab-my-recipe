import { NextRequest, NextResponse } from "next/server";
import { updateRecipe } from "@/lib/db/actions/recipes.action";

export async function PUT(req: NextRequest) {
  //   const userId = req.nextUrl.searchParams.get("userId");
  //   if (!userId) {
  //     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  //   }

  console.log("here inside UPDATE");

  const body = await req.json();
  const { id, ...fieldsToUpdate } = body;

  console.log ("This is the body", body)

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // Update the recipe in the database with any provided fields
  const updatedRecipe = await updateRecipe(id, fieldsToUpdate);
  return NextResponse.json({ recipe: updatedRecipe }, { status: 200 });
}
