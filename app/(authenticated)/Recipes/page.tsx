"use client";

import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import EditRecipeForm from "@/components/EditRecipeForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid3X3, List } from "lucide-react";
import { Heart, Edit } from "lucide-react";
import Image from "next/image";
import { RecipeType } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function RecipesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  // Remove manual recipes and loading state, use React Query instead
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filterType, setFilterType] = useState<
    "all" | "favorites" | "non-favorites"
  >("all");
  // New state for sorting by date
  const [sortDate, setSortDate] = useState<"newest" | "oldest">("newest");

  // Use React Query for fetching recipes
  const queryClient = useQueryClient();
  const {
    data: recipes,
    isLoading,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const res = await fetch("/api/recipe/getRecipes");
      if (!res.ok) throw new Error("Failed to fetch recipes");
      const data = await res.json();
      return data.recipes;
    },
  });

  // Update recipe and refetch recipes after mutation
  const updateRecipe = async (
    id: string,
    fieldsToUpdate: Partial<RecipeType>
  ) => {
    try {
      const res = await fetch("/api/recipe/updateFavorite", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...fieldsToUpdate }),
      });

      if (!res.ok) throw new Error("Failed to update recipe");
      const data = await res.json();
      console.log("Update response data:", data);
      // Invalidate and refetch recipes
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  // Edit modal logic
  const handleEditClick = (recipe: RecipeType) => {
    setSelectedRecipe(recipe);
    setShowEditModal(true);
  };

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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl mx-auto w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              {/* Filter type dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={filterType}
                  onChange={(e) =>
                    setFilterType(
                      e.target.value as "all" | "favorites" | "non-favorites"
                    )
                  }
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700 dark:text-gray-200"
                >
                  <option value="all">All Recipes</option>
                  <option value="favorites">Favorites</option>
                  <option value="non-favorites">Non-favorites</option>
                </select>
              </div>
              {/* Sort by date dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={sortDate}
                  onChange={(e) =>
                    setSortDate(e.target.value as "newest" | "oldest")
                  }
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700 dark:text-gray-200"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Show loading spinner or message if loading */}
        {isLoading ? (
          <div className="text-center text-gray-500 dark:text-gray-300 py-10">
            Loading recipes...
          </div>
        ) : !recipes ? (
          <div className="text-center text-red-500 py-10">
            Failed to load recipes.
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes
              .slice() // copy array so sort doesn't mutate state
              .sort((a: RecipeType, b: RecipeType) => {
                if (sortDate === "newest") {
                  return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                  );
                } else {
                  return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                  );
                }
              })
              .filter((recipe: RecipeType) => {
                const matchesSearch = recipe.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
                if (filterType === "favorites")
                  return matchesSearch && recipe.favorite;
                if (filterType === "non-favorites")
                  return matchesSearch && !recipe.favorite;
                return matchesSearch;
              })
              .map((recipe: RecipeType) => (
                <div
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-md transition-shadow flex flex-col cursor-pointer relative"
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    console.log("Selected recipe:", recipe);
                    setShowModal(true);
                  }}
                  key={recipe.id}
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
                  <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span className="text-base">{recipe.channel}</span>
                    <div className="flex gap-2 mt-1">
                      <button
                        className={
                          recipe.favorite
                            ? "text-red-500 transition-colors"
                            : "text-gray-600 hover:text-red-500 transition-colors"
                        }
                        aria-label="Favorite"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateRecipe(recipe.id, {
                            favorite: !recipe.favorite,
                          });
                        }}
                      >
                        <Heart
                          className="w-6 h-6"
                          strokeWidth={recipe.favorite ? 0 : 2}
                          fill={recipe.favorite ? "red" : "none"}
                        />
                      </button>
                      <button
                        className="text-gray-600 hover:text-orange-500 transition-colors"
                        aria-label="Edit Recipe"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(recipe);
                        }}
                      >
                        <Edit className="w-6 h-6" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recipes
              .slice()
              .sort((a: RecipeType, b: RecipeType) => {
                if (sortDate === "newest") {
                  return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                  );
                } else {
                  return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                  );
                }
              })
              .filter((recipe: RecipeType) => {
                const matchesSearch = recipe.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
                if (filterType === "favorites")
                  return matchesSearch && recipe.favorite;
                if (filterType === "non-favorites")
                  return matchesSearch && !recipe.favorite;
                return matchesSearch;
              })
              .map((recipe: RecipeType) => (
                <div
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    setShowModal(true);
                  }}
                  key={recipe.id}
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
                    <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span className="text-base">{recipe.channel}</span>
                      <div className="flex gap-2 mt-1">
                        <button
                          className={
                            recipe.favorite
                              ? "text-red-500 transition-colors"
                              : "text-gray-600 hover:text-red-500 transition-colors"
                          }
                          aria-label="Favorite"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateRecipe(recipe.id, {
                              favorite: !recipe.favorite,
                            });
                          }}
                        >
                          <Heart
                            className="w-6 h-6"
                            strokeWidth={recipe.favorite ? 0 : 2}
                            fill={recipe.favorite ? "red" : "none"}
                          />
                        </button>
                        <button
                          className="text-gray-600 hover:text-orange-500 transition-colors"
                          aria-label="Edit Recipe"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(recipe);
                          }}
                        >
                          <Edit className="w-6 h-6" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
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
        {/* Modal for EditRecipeForm */}
        {showEditModal && selectedRecipe && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
            onClick={() => setShowEditModal(false)}
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-2xl w-full relative max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                onClick={() => setShowEditModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <EditRecipeForm recipeData={selectedRecipe} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
