"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadRecipeSkeleton } from "@/components/UploadRecipeSkeleton";
import { toast } from "react-hot-toast";
import { RecipeType } from "@/lib/types";
import RecipeCard from "@/components/RecipeCard";

export default function UploadRecipePage() {
  const [url, setUrl] = useState("");
  const [recipeData, setRecipeData] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadRecipe, setUploadRecipe] = useState(true);

  const getVideoId = (url: string) => {
    if (!url) return null;
    try {
      const parseUrl = new URL(url);
      // Handle youtu.be short links
      if (parseUrl.hostname === "youtu.be") {
        return parseUrl.pathname.replace("/", "");
      }
      // Handle youtube.com URLs
      if (parseUrl.hostname.includes("youtube.com")) {
        return parseUrl.searchParams.get("v");
      }
      return null;
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
          `/api/youtube/yt-transcript?videoId=${videoId}`
        );
        const transcriptData = await transcriptRes.json();
        console.log("Transcript Data:", transcriptData);
        console.log("Transcript Data CONTENT:", transcriptData.content);
        const transcript = transcriptData.content;
        if (!transcript) {
          toast.error("Transcript not found for this video.");
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
        console.log("Parsed Recipe Data:", data.output_text);
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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 mt-8">
          {uploadRecipe ? (
            <>
              <h1 className="text-4xl font-extrabold text-center text-orange-600 mb-4">
                Grab My Recipe
              </h1>
              <p className="text-lg text-center text-gray-700 mb-6">
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
                onClick={() => {
                  saveRecipe();
                  setUploadRecipe(true);
                }}
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
          ) : recipeData && !uploadRecipe ? (
            <RecipeCard recipeData={recipeData} />
          ) : null}
        </div>
      </main>
    </div>
  );
}
