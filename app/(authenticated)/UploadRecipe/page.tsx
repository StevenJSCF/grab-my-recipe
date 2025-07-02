import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UploadRecipePage() {
  const [url, setUrl] = useState("");
  const [recipeData, setRecipeData] = useState<any>(null);

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
          return fetch(`/api/recipe/parse-recipe?transcript=${encodeURIComponent(transcript)}`);
        })
        .then((response) => response.json())
        .then((data) => {
           const parsedRecipe = JSON.parse(data.output_text); 
           setRecipeData(parsedRecipe)
           console.log("Recipe Data " + recipeData)
        })
        .catch((error) => {
          console.error("Error fetching transcript:", error);
        });
    } else {
      alert("Invalid YouTube URL");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
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
      </div>
        
        {/*Displaying Recipe*/}
        {recipeData && (
            <form>
                {/*Tittle*/}
                <div>
                    <label>Title</label>
                    <Input 
                        value={recipeData.tittle}
                        onChange={e => setRecipeData({ ...recipeData, tittle: e.target.value})}
                    />
                </div>
                {/*Ingredients*/}
                {/* <div>
                    <label>Ingredients</label>
                    {Array.isArray(recipeData.ingredients) && recipeData.ingredients.map((ingredient, idx) => 
                        <div key={idx} className="flex gap-2">
                            <Input
                                value={ingredient.name}
                                onChange={e => {
                                    const newIngredients = [...recipeData.ingredients]
                                    newIngredients[idx].name = e.target.value
                                    setRecipeData({...recipeData, ingredients: newIngredients]})
                                }}
                            />
                        </div>
                    )}

                </div> */}
            </form>
        )}


    </div>
  );
}
