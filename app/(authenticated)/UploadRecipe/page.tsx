import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ingredient, Instruction } from "@/lib/generated/prisma/client";
import { SidebarNav } from "@/components/sidebar-nav";
import { defaultOverrides } from "next/dist/server/require-hook";
import Image from "next/image";

export default function UploadRecipePage() {
  const [url, setUrl] = useState("");
  const [recipeData, setRecipeData] = useState<any>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const mockRecipe = {
    tittle: "Spaghetti Bolognese",
    ingredients: [
      { name: "Spaghetti", quantity: "200g" },
      { name: "Ground Beef", quantity: "300g" },
      // ...more ingredients
    ],
    instructions: [
      { step: "1", description: "Bring a large pot of water to a boil." },
      { step: "2", description: "Add spaghetti and cook until al dente." },
      // ...more steps
    ],
  };

  const getVideoId = (url: string) => {
    if (!url) return null;
    try {
      const parseUrl = new URL(url);
      return parseUrl.searchParams.get("v");
    } catch {
      return null;
    }
  };

  const handleButtonClick = () => {
    const videoId = getVideoId(url);

    console.log("Video ID:", videoId);
    if (videoId) {
      //127.0.0.1:5000/transcript?videoId=4nAfxzE02Gw
      fetch(`http://127.0.0.1:5000/transcript?videoId=${videoId}`)
        .then((response) => response.json())
        .then((data) => {
          const transcript = data.transcript;
          if (!transcript) {
            throw new Error("Transcript not found in the response");
          }
          return fetch("api/recipe/parse-recipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transcript }),
          });
        })
        .then((response) => response.json())
        .then((data) => {
          const parsedRecipe = JSON.parse(data.output_text);
          setRecipeData(parsedRecipe);
          console.log("Recipe Data " + recipeData);
        })
        .catch((error) => {
          console.error("Error fetching transcript:", error);
        });
    } else {
      alert("Invalid YouTube URL");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      <SidebarNav
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded((prev) => !prev)}
      />
      <div
        className={`flex-1 px-4 py-8 transition-all duration-300 ${
          isSidebarExpanded ? "ml-64" : "ml-16"
        }`}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Upload Recipe
        </h1>
        <p>Please enter the cooking video url</p>
        <div className="flex gap-2 mt-2 w-full max-w-md">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
          />
          <Button onClick={handleButtonClick}>Submit</Button>
        </div>
        <Button onClick={() => setRecipeData(mockRecipe)}>
          Load Mock Recipe
        </Button>
        {/*Displaying Recipe*/}

        {recipeData ? (
          <div>
            <div className="flex flex-col">
              {/*Youtube Video Info*/}
              {/* Image on top */}
              <div className="flex justify-center mb-6">
                <Image
                  src="/placeholder.png"
                  alt="Recipe image"
                  width={400}
                  height={300}
                />
              </div>
              {/* Ingredients and Instructions side by side */}
              <div className="flex flex-row gap-8">
                {/* Ingredients */}
                <div className="flex-1 border-2 border-black p-4">
                  <h2 className="font-bold mb-2">Ingredients</h2>
                  {/* ...ingredients list here... */}
                </div>
                {/* Instructions */}
                <div className="flex-1 border-2 border-black p-4">
                  <h2 className="font-bold mb-2">Instructions</h2>
                  {/* ...instructions list here... */}
                </div>
              </div>
            </div>
            <form>
              {/*Tittle*/}
              <div>
                <label>Title</label>
                <Input
                  value={recipeData.tittle}
                  onChange={(e) =>
                    setRecipeData({ ...recipeData, tittle: e.target.value })
                  }
                />
              </div>
              {/*Ingredients*/}
              <div>
                <label>Ingredients</label>
                {Array.isArray(recipeData.ingredients) &&
                  recipeData.ingredients.map(
                    (ingredient: Ingredient, idx: number) => (
                      <div key={idx}>
                        <div className="flex gap-2">
                          {/* Name */}
                          <Input
                            value={ingredient.name}
                            onChange={(e) => {
                              const newIngredients = [
                                ...recipeData.ingredients,
                              ];
                              newIngredients[idx].name = e.target.value;
                              setRecipeData({
                                ...recipeData,
                                ingredients: newIngredients,
                              });
                            }}
                          />
                        </div>
                        {/* Quantity */}
                        <div className="flex gap-2">
                          <Input
                            value={ingredient.quantity}
                            onChange={(e) => {
                              const newIngredients = [
                                ...recipeData.ingredients,
                              ];
                              newIngredients[idx].quantity = e.target.value;
                              setRecipeData({
                                ...recipeData,
                                ingredients: newIngredients,
                              });
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
              </div>
              {/*Steps*/}
              <div>
                <label>Instructions</label>
                {Array.isArray(recipeData.instructions) &&
                  recipeData.instructions.map(
                    (instructions: Instruction, idx: number) => (
                      <div key={idx}>
                        <div className="flex gap-2">
                          {/* Name */}
                          <Input
                            value={instructions.step}
                            onChange={(e) => {
                              const newInstructions = [
                                ...recipeData.instructions,
                              ];
                              newInstructions[idx].step = e.target.value;
                              setRecipeData({
                                ...recipeData,
                                instructions: newInstructions,
                              });
                            }}
                          />
                        </div>
                        {/* Quantity */}
                        <div className="flex gap-2">
                          <Input
                            value={instructions.description}
                            onChange={(e) => {
                              const newInstructions = [
                                ...recipeData.instructions,
                              ];
                              newInstructions[idx].description = e.target.value;
                              setRecipeData({
                                ...recipeData,
                                instructions: newInstructions,
                              });
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
              </div>
            </form>
          </div>
        ) : (
          <div className="text-gray-500 mt-8">
            You first need to upload the recipe.
          </div>
        )}
      </div>
    </div>
  );
}
