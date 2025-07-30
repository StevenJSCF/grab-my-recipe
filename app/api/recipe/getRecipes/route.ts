
import { NextResponse } from "next/server";
import { getRecipes } from "@/lib/db/actions/recipes.action";
import { getUserFromSession } from "@/lib/getUserFromSession";

export async function GET() {
   const sessionData = await getUserFromSession();
     if (!sessionData) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }

      const { user, sessionId } = sessionData;
      void sessionId; // Use sessionId to satisfy build (not needed here)
      
  const recipes = await getRecipes(user.id);
  return NextResponse.json({ recipes }, { status: 200 });
}
