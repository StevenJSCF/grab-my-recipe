import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Eye, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/recipe-data"
import { cn } from "@/lib/utils"

interface RecipeCardProps {
  recipe: Recipe
  isCompact?: boolean
}

export function RecipeCard({ recipe, isCompact = false }: RecipeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="relative">
        <img
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {recipe.cookTime}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <img
              src={recipe.author.avatar || "/placeholder.svg"}
              alt={recipe.author.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="min-w-0 flex-1">
              <h3
                className={cn(
                  "font-semibold text-gray-900 dark:text-white line-clamp-2",
                  isCompact ? "text-sm" : "text-base",
                )}
              >
                {recipe.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{recipe.author.name}</p>
            </div>
          </div>
        </div>

        <p className={cn("text-gray-600 dark:text-gray-300 line-clamp-2 mb-3", isCompact ? "text-xs" : "text-sm")}>
          {recipe.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{recipe.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{recipe.rating}</span>
            </div>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{recipe.uploadedAt}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
            {!isCompact &&
              recipe.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
