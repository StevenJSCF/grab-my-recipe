"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid3X3, List } from "lucide-react";
import { sampleRecipes } from "@/lib/recipe-data";
import Image from "next/image";
export default function RecipesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter recipes by search query (case-insensitive)
  const filteredRecipes = sampleRecipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-md transition-shadow flex flex-col"
              >
                <Image
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                  width={640}
                  height={480}
                />
                <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                  {recipe.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow"
              >
                <Image
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-24 h-24 object-cover rounded-lg"
                  width={640}
                  height={480}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                    {recipe.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
