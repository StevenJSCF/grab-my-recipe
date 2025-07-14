"use client";

import { useState, useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid3X3, List } from "lucide-react";
import Image from "next/image";
import { RecipeType } from "@/lib/types";

export default function RecipesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch recipes from backend API
  const getRecipes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/recipe/getRecipes");
      if (!res.ok) throw new Error("Failed to fetch recipes");
      const data = await res.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  // Filter recipes by search query (case-insensitive)
  // const filteredRecipes = recipes.filter(
  //   (recipe) =>
  //     recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Recipes
          </h1>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="px-6 pb-4">
          <div className="relative max-w-md mx-auto w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((recipe) => (
              <div
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-md transition-shadow flex flex-col cursor-pointer"
                onClick={() => {
                  setSelectedRecipe(recipe);
                  console.log("Selected recipe:", recipe);
                  setShowModal(true);
                }}
              >
                <Image
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                  width={200}
                  height={200}
                />
                <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white line-clamp-2">
                  {recipe.title}
                </h3>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {recipe.channel}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recipes.map((recipe) => (
              <div
                className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedRecipe(recipe);
                  setShowModal(true);
                }}
              >
                <Image
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-24 h-24 object-cover rounded-lg"
                  width={200}
                  height={200}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                    {recipe.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for RecipeCard */}
        {showModal && selectedRecipe && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-2xl w-full relative max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <RecipeCard recipeData={selectedRecipe} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
