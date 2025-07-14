import { createRecipe } from "@/lib/db/actions/recipes.action";
import { NextRequest, NextResponse } from "next/server";
import { RecipeData } from "@/lib/types";

// /api/recipes/create
export async function POST(req: NextRequest) {
  try {
    // Optionally: Check if the user is logged in (if you use auth)
    // const session = await getServerSession(authOptions);
    // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    console.log("this is the beginning of the post")
    const requestBody = await req.json();

    const recipeData: RecipeData = {
      title: requestBody.title,
      ingredients: requestBody.ingredients,
      instructions: requestBody.instructions,
      favorite: requestBody.favorite || false,
      userId: requestBody.userId || "", 
      createdAt: new Date(),
      updatedAt: new Date(),
      image: requestBody.image || "",
      channel: requestBody.channel || "",
      duration: requestBody.duration || "",
      serving: requestBody.serving || "",
    }

    console.log("this is the form data inside the POST: " + JSON.stringify(requestBody))
    console.log("THIS IS THE RECIPE DATA: " + JSON.stringify(recipeData))


    if (!recipeData) {
      return NextResponse.json({ error: "Missing form data" }, { status: 400 });
    }

    // Create the recipe in the database
    const recipe = await createRecipe(recipeData);
    return NextResponse.json({ recipe }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
