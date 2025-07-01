export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  cookTime: string
  difficulty: "Easy" | "Medium" | "Hard"
  rating: number
  views: string
  uploadedAt: string
  author: {
    name: string
    avatar: string
  }
  tags: string[]
}

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Perfect Chocolate Chip Cookies",
    description:
      "Crispy on the outside, chewy on the inside - these are the ultimate chocolate chip cookies that everyone will love.",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: "25 min",
    difficulty: "Easy",
    rating: 4.8,
    views: "2.3M",
    uploadedAt: "2 weeks ago",
    author: {
      name: "Baker's Kitchen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["dessert", "cookies", "chocolate"],
  },
  {
    id: "2",
    title: "Homemade Pizza Dough Recipe",
    description: "Learn how to make authentic Italian pizza dough from scratch with just 4 simple ingredients.",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: "2 hours",
    difficulty: "Medium",
    rating: 4.9,
    views: "1.8M",
    uploadedAt: "1 month ago",
    author: {
      name: "Italian Cooking",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["italian", "pizza", "bread"],
  },
  {
    id: "3",
    title: "Creamy Chicken Alfredo Pasta",
    description: "Rich and creamy alfredo sauce with tender chicken and perfectly cooked fettuccine pasta.",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: "30 min",
    difficulty: "Medium",
    rating: 4.7,
    views: "3.1M",
    uploadedAt: "3 days ago",
    author: {
      name: "Pasta Master",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["pasta", "chicken", "creamy"],
  },
  {
    id: "4",
    title: "Fresh Garden Salad",
    description: "A vibrant mix of fresh vegetables with a tangy vinaigrette dressing.",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: "10 min",
    difficulty: "Easy",
    rating: 4.5,
    views: "890K",
    uploadedAt: "1 week ago",
    author: {
      name: "Healthy Eats",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["salad", "healthy", "vegetarian"],
  },
  {
    id: "5",
    title: "Beef Stir Fry with Vegetables",
    description: "Quick and easy beef stir fry loaded with colorful vegetables in a savory sauce.",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: "20 min",
    difficulty: "Easy",
    rating: 4.6,
    views: "1.2M",
    uploadedAt: "5 days ago",
    author: {
      name: "Asian Kitchen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["stir-fry", "beef", "asian"],
  },
  {
    id: "6",
    title: "Classic Banana Bread",
    description: "Moist and flavorful banana bread that's perfect for breakfast or an afternoon snack.",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: "1 hour",
    difficulty: "Easy",
    rating: 4.8,
    views: "2.7M",
    uploadedAt: "2 months ago",
    author: {
      name: "Home Baking",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["bread", "banana", "breakfast"],
  },
  {
    id: "7",
    title: "Spicy Thai Green Curry",
    description: "Authentic Thai green curry with coconut milk, vegetables, and aromatic herbs.",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: "45 min",
    difficulty: "Hard",
    rating: 4.9,
    views: "1.5M",
    uploadedAt: "1 week ago",
    author: {
      name: "Thai Flavors",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["thai", "curry", "spicy"],
  },
  {
    id: "8",
    title: "Grilled Salmon with Lemon",
    description: "Perfectly grilled salmon fillet with fresh lemon and herbs.",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: "15 min",
    difficulty: "Medium",
    rating: 4.7,
    views: "980K",
    uploadedAt: "4 days ago",
    author: {
      name: "Seafood Chef",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["salmon", "grilled", "healthy"],
  },
]