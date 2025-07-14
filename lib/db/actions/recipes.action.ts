import prisma from "@/lib/prisma";
import { Ingredient, Instruction } from "@/lib/generated/prisma";

type RecipeData = {
  title: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  favorite: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  channel: string;
  duration: string;
  serving: string;
};

// Get all recipes
export const getRecipes = async () => {
  return await prisma.recipe.findMany();
};

// Get a single recipe by ID
export const getRecipeById = async (id: string) => {
  return await prisma.recipe.findUnique({ where: { id } });
};

// Create a new recipe
export const createRecipe = async (data: any) => {
  return await prisma.recipe.create({ data  });
};

// Update a recipe
export const updateRecipe = async (id: string, data: any) => {
  return await prisma.recipe.update({ where: { id }, data });
};

// Delete a recipe
export const deleteRecipe = async (id: string) => {
  return await prisma.recipe.delete({ where: { id } });
};
