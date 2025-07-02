import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UploadRecipePage() {
  const [url, setUrl] = useState("");

  const getVideoId = (url: string) => {
    const parseUrl = new URL(url);

    return parseUrl.searchParams.get("v");
  };

  const handleButtonClick = () => {
    const videoId = getVideoId(url);

    console.log("Video ID:", videoId);
    if (videoId) {
      //127.0.0.1:5000/transcript?videoId=4nAfxzE02Gw
      fetch(`http://127.0.0.1:5000/transcript?videoId=${videoId}`)
        .then((response) => response.json())
        .then((data) => {
            
          console.log("API response:", data);
          console.log("Transcript:", data.transcript);
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
    </div>
  );
}
