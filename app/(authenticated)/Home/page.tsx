import React from "react";
import { BookOpen, Upload } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          Welcome back to GrabMyRecipe!
        </h1>
        `{" "}
      </div>
      <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 mb-8 text-center max-w-xl">
        Your personal recipe dashboard. Quickly access your recipes, upload new
        ones, or check your favorites. Stay organized and inspired!
      </p>
      `
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <Link
          href="/Recipes"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow group border border-orange-100 dark:border-gray-800"
        >
          <BookOpen className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
            My Recipes
          </span>
        </Link>
        <Link
          href="/UploadRecipe"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow group border border-orange-100 dark:border-gray-800"
        >
          <Upload className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
            Upload Recipe
          </span>
        </Link>
      </div>
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-4 border border-orange-50 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Quick Tips
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-base space-y-1">
          <li>
            Make sure the Youtube video URL is valid when uploading recipes.
          </li>
          <li>
            Some Youtube videos may not have the ingredients mentioned in the
            video or description. The app will try to extract them, but may
            fail.
          </li>
          <li>Mark recipes as favorites for easy access later.</li>
        </ul>
      </div>
    </div>
  );
}
