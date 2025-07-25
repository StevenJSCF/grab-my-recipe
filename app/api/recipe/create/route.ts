import { createRecipe } from "@/lib/db/actions/recipes.action";
import { NextRequest, NextResponse } from "next/server";
import { RecipeType } from "@/lib/types";
import { auth } from "@/auth";

// /api/recipes/create
export async function POST(req: NextRequest) {
  try {
    // Optionally: Check if the user is logged in (if you use auth)
    const session = await auth();
    console.log("Session data:", JSON.stringify(session, null, 2));

    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const requestBody = await req.json();

    // Ensure we have a valid user ID
    const userId = session.user?.id || session.user?.email;
    console.log("Available user data:", {
      id: session.user?.id,
      email: session.user?.email,
      name: session.user?.name,
    });

    if (!userId) {
      console.error("No user ID or email found in session:", session);
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 400 }
      );
    }

    //Ignore the id field mongo will generate it
    const recipeData: Omit<RecipeType, "id"> = {
      title: requestBody.title,
      ingredients: requestBody.ingredients,
      instructions: requestBody.instructions,
      favorite: requestBody.favorite || false,
      userId: userId, // Use the validated user ID
      createdAt: new Date(),
      updatedAt: new Date(),
      image: requestBody.image || "",
      channel: requestBody.channel || "",
      duration: requestBody.duration || "",
      serving: requestBody.serving || "",
    };

    console.log("Creating recipe with data:", recipeData);
    console.log("User ID being used:", recipeData.userId);

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
