import { NextRequest, NextResponse } from "next/server";
import { updateFavorite } from "@/lib/db/actions/recipes.action";

export async function PUT(req: NextRequest) {
  console.log("here inside UPDATE");

  const body = await req.json();
  const { id, ...fieldsToUpdate } = body;

  console.log ("This is the body", body)

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // Update the recipe in the database with any provided fields
  const updatedRecipe = await updateFavorite(id, fieldsToUpdate);
  return NextResponse.json({ recipe: updatedRecipe }, { status: 200 });
}

