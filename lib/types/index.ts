import { Ingredient, Instruction } from "../generated/prisma";



export type RecipeData = {
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
