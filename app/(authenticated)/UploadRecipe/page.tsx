"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ingredient, Instruction } from "@/lib/generated/prisma/client";
import Image from "next/image";
import { UploadRecipeSkeleton } from "@/components/UploadRecipeSkeleton";
import { toast } from "react-hot-toast";

type RecipeData = {
  title: string;
  description: string | null;
  favorite: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  channel: string;
  duration: string;
  serving: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  // add any other fields you use
};

export default function UploadRecipePage() {
  const [url, setUrl] = useState("");
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(false);

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
        const image = videoInfo.snippet.images.maxres.url;
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
          image,
          title, // This will overwrite parsedRecipe.title
        };

        if (parsedRecipe.message === "not_a_cooking_video") {
          toast.error("No recipe could be extracted.");
          console.log("This is not a cooking video");

          setRecipeData(null);
          return;
        }
        if (parsedRecipe.message === "cooking_video") {
          toast.success("Recipe extracted successfully");
          setRecipeData(fullRecipe);
          console.log("Recipe Data " + recipeData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please enter a valid YouTube video URL");
    }
  };

  return (
    <div className="min-h-screen dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mt-8">
          <h1 className="text-4xl font-extrabold text-center text-orange-600 dark:text-orange-300 mb-4">
            Grab My Recipe
          </h1>
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-6">
            Paste a YouTube cooking video URL below to extract the recipe!
          </p>
          <div className="flex gap-2 mb-4">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter YouTube video URL"
              className="flex-1 border-2 border-orange-300 focus:border-orange-500 rounded-lg px-3 py-2"
            />
            <Button
              onClick={handleButtonClick}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Submit
            </Button>
          </div>
        </div>

        <div className="w-full max-w-3xl mt-8">
          {loading ? (
            <UploadRecipeSkeleton />
          ) : recipeData ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10">
              <div className="flex flex-col gap-12">
                {" "}
                {/* Remove md:flex-row to always stack */}
                {/* Left: image and Info */}
                <div className="flex-1 flex flex-col items-center">
                  <Image
                    src={recipeData.image}
                    alt="Recipe image"
                    width={320}
                    height={240}
                    className="rounded-lg border border-orange-200 shadow"
                  />
                  <h2 className="text-2xl font-bold mt-4 text-orange-700 dark:text-orange-300 text-center">
                    {recipeData.title}
                  </h2>
                  <p className="text-md text-gray-700 dark:text-gray-300 mt-1 text-center">
                    <span className="font-semibold">Channel:</span>{" "}
                    {recipeData.channel}
                  </p>
                  <div className="flex justify-center gap-4 mt-2">
                    <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-semibold">
                      Ready In: {recipeData.duration}
                    </span>
                    <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-semibold">
                      Serves: {recipeData.serving}
                    </span>
                  </div>
                </div>
                {/* Right: Ingredients and Instructions */}
                <div className="flex-1 flex flex-col gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-orange-600 dark:text-orange-300">
                      Ingredients
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {Array.isArray(recipeData.ingredients) &&
                        recipeData.ingredients.map(
                          (ingredient: Ingredient, idx: number) => (
                            <li
                              key={idx}
                              className="flex justify-between text-gray-800 dark:text-gray-200"
                            >
                              <span>{ingredient.name}</span>
                              <span className="text-gray-500">
                                {ingredient.quantity}
                              </span>
                            </li>
                          )
                        )}
                    </ul>
                    <p className="text-gray-400 mt-2 text-xs">
                      Note: Ingredients without a specific quantity are marked
                      as &quot;N/A&quot;.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-orange-600 dark:text-orange-300">
                      Instructions
                    </h3>
                    <ol className="list-decimal list-inside space-y-1">
                      {Array.isArray(recipeData.instructions) &&
                        recipeData.instructions.map(
                          (instruction: Instruction, idx: number) => (
                            <li
                              key={idx}
                              className="text-gray-800 dark:text-gray-200"
                            >
                              <span className="font-semibold">
                                {instruction.description}
                              </span>
                            </li>
                          )
                        )}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
