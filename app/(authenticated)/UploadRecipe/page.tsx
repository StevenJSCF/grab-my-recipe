import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ingredient, Instruction } from "@/lib/generated/prisma/client";
import { SidebarNav } from "@/components/sidebar-nav";
import Image from "next/image";
import { UploadRecipeSkeleton } from "@/components/UploadRecipeSkeleton";

export default function UploadRecipePage() {
  const [url, setUrl] = useState("");
  const [recipeData, setRecipeData] = useState<any>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const mockRecipe = {
    title: "Spaghetti Bolognese",
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

  const handleButtonClick = async () => {
    const videoId = getVideoId(url);
    console.log("Video ID:", videoId);
    if (videoId) {
      setLoading(true);
      try {
        // Fetch video transcript
        const transcriptRes = await fetch(
          `http://127.0.0.1:5000/transcript?videoId=${videoId}`
        );
        const transcriptData = await transcriptRes.json();
        const transcript = transcriptData.transcript;
        if (!transcript) {
          throw new Error("Transcript not found in the response");
        }
        // Fetch YouTube metadata from your own API route (server-side)
        const youtubeRes = await fetch("/api/youtube/google-ytv3", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId }),
        });
        const youtubeData = await youtubeRes.json();
        if (
          !youtubeData ||
          !youtubeData.items ||
          youtubeData.items.length === 0
        ) {
          throw new Error("No video info found for this video ID.");
        }
        const videoInfo = youtubeData.items[0];
        const channel = videoInfo.snippet.channelTitle;
        const thumbnail = videoInfo.snippet.thumbnails.maxres.url;
        const title = videoInfo.snippet.title;
        const description = videoInfo.snippet.description;
        // Combine transcript and video desc
        const combined = { transcript, description };
        // Send to backend
        const response = await fetch("api/recipe/parse-recipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(combined),
        });
        const data = await response.json();
        const parsedRecipe = JSON.parse(data.output_text);
        const fullRecipe = {
          ...parsedRecipe,
          channel,
          thumbnail,
          title, // This will overwrite parsedRecipe.title
        };
        setRecipeData(fullRecipe);
        console.log("Set recipeData:", fullRecipe);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
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
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
          Upload Recipe
        </h1>
        <p className="text-3xl font-bold">Please enter the cooking video url</p>
        <div className="flex gap-2 mt-2 w-full max-w-md">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
          />
          <Button onClick={handleButtonClick}>Submit</Button>
        </div>

        {/*Displaying Recipe*/}
        {loading ? (
          <UploadRecipeSkeleton />
        ) : recipeData ? (
          <div>
            <div className="flex flex-col">
              {/*Title*/}
              <div className="mb-8 mt-8">
                <h1 className="font-bold text-4xl">{recipeData.title}</h1>
                <p className="font-bold text-xl">
                  Youtube Channel: {recipeData.channel}
                </p>
                <p className="font-bold text-xl">Video Link: {url}</p>
              </div>

              {/*Youtube Video Info*/}
              <div className="flex justify-center mb-6">
                <div className="">
                  <Image
                    src={recipeData.thumbnail} //Youtube thumbnail can be get from the google api
                    alt="Recipe image"
                    width={400}
                    height={300}
                  />
                  <div className="flex mt-2">
                    <span className="w-1/2">
                      <span className="font-bold">Ready In:</span>{" "}
                      {recipeData.duration}
                    </span>
                    <span className="w-1/2">
                      <span className="font-bold">Serves:</span>{" "}
                      {recipeData.serving}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ingredients and Instructions */}
              <div className="flex flex-row gap-8">
                {/* Ingredients */}
                <div className="flex-1 border-2 border-black p-4">
                  <h2 className="font-bold mb-2 text-2xl">Ingredients</h2>
                  {Array.isArray(recipeData.ingredients) &&
                    recipeData.ingredients.map(
                      (ingredient: Ingredient, idx: number) => (
                        <div key={idx} className="flex gap-2 mb-2 items-center">
                          {/* Name */}
                          <span className="font-medium w-1/2">
                            {ingredient.name}
                          </span>
                          {/* Quantity */}
                          <span className="text-gray-700 w-1/2">
                            {ingredient.quantity}
                          </span>
                        </div>
                      )
                    )}
                </div>
                {/* Instructions */}
                <div className="flex-1 border-2 border-black p-4">
                  <h2 className="font-bold mb-2 text-2xl">Instructions</h2>
                  {Array.isArray(recipeData.instructions) &&
                    recipeData.instructions.map(
                      (instruction: Instruction, idx: number) => (
                        <div key={idx} className="flex gap-2 mb-2 items-center">
                          {/* Name */}
                          <span className="font-medium">
                            {instruction.step}
                          </span>
                          {/* Quantity */}
                          <span className="text-gray-700 ">
                            {instruction.description}
                          </span>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
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
