import { Ingredient, Instruction } from "../generated/prisma";



export type RecipeType = {
  id: string;
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
