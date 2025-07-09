"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Grid3X3, List } from "lucide-react"
import { RecipeCard } from "@/components/recipe-card"
import { sampleRecipes } from "@/lib/recipe-data"
import { cn } from "@/lib/utils"

interface RecipesPageProps {
  sidebarExpanded: boolean
}

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Vegetarian", "Vegan", "Gluten-Free"]

const sortOptions = ["Most Recent", "Most Popular", "Highest Rated", "Cook Time", "Difficulty"]

export function RecipesPage({ sidebarExpanded }: RecipesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("Most Recent")

  // Calculate grid columns based on sidebar state
  const getGridCols = () => {
    if (sidebarExpanded) {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    } else {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="px-6 py-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
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

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer hover:bg-orange-100 hover:text-orange-800 dark:hover:bg-orange-900 dark:hover:text-orange-300"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Results and Sort */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">Showing {sampleRecipes.length} recipes</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-800"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  Sort by: {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {viewMode === "grid" ? (
          <div className={cn("grid gap-6 transition-all duration-300", getGridCols())}>
            {sampleRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} isCompact={!sidebarExpanded} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sampleRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow"
              >
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{recipe.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{recipe.cookTime}</span>
                    <span>{recipe.difficulty}</span>
                    <span>{recipe.views} views</span>
                    <span>{recipe.uploadedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}



