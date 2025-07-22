import { NextRequest, NextResponse } from "next/server";
import { updateRecipe } from "@/lib/db/actions/recipes.action";
import { auth } from "@/auth";
export async function PUT(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

