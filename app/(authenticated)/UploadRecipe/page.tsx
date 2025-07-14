"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ingredient, Instruction } from "@/lib/generated/prisma/client";
import Image from "next/image";
import { UploadRecipeSkeleton } from "@/components/UploadRecipeSkeleton";
import { toast } from "react-hot-toast";
import { RecipeData } from "@/lib/types";

export default function UploadRecipePage() {
  const [url, setUrl] = useState("");
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadRecipe, setUploadRecipe] = useState(true);

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
        //Some videos dont have certain size
        let image = "";
        const thumbs = videoInfo.snippet.thumbnails;
        if (thumbs.maxres && thumbs.maxres.url) {
          image = thumbs.maxres.url;
        } else if (thumbs.standard && thumbs.standard.url) {
          image = thumbs.standard.url;
        } else if (thumbs.high && thumbs.high.url) {
          image = thumbs.high.url;
        } else if (thumbs.medium && thumbs.medium.url) {
          image = thumbs.medium.url;
        } else if (thumbs.default && thumbs.default.url) {
          image = thumbs.default.url;
        } else {
          image = ""; // fallback if none exist
        }

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
          setUploadRecipe(false); // Switch to recipe view after successful extraction
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

  //Saving recipe
  const saveRecipe = async () => {
    if (!recipeData) {
      toast.error("No recipe to save. Please extract a recipe first.");
      return;
    }
    try {
      console.log(
        "this is the form data before sending to the backend: " +
          JSON.stringify(recipeData)
      );
      const response = await fetch("/api/recipe/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to save recipe. Status:",
          response.status,
          "Response:",
          errorText
        );
        throw new Error(
          `Failed to save recipe: ${response.status} - ${errorText}`
        );
      }
      toast.success("Recipe saved successfully!");
    } catch (error) {
      toast.error("Error saving recipe. Please try again.");
      console.error("Save recipe error:", error);
    }
  };

  return (
    <div className="min-h-screen dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mt-8">
          {uploadRecipe ? (
            <>
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
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full">
              <Button
                onClick={saveRecipe}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2M7 10V6a2 2 0 012-2h6a2 2 0 012 2v4m-5 4h.01"
                  />
                </svg>
                Save Recipe
              </Button>
              <Button
                onClick={() => setUploadRecipe(true)}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                Upload New Recipe
              </Button>
            </div>
          )}
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
