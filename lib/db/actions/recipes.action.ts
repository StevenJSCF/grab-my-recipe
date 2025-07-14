import prisma from "@/lib/prisma";

// Get all recipes
// Here I will need to get all recipes by userId
export const getRecipes = async () => {
const recipes = await prisma.recipe.findMany({
  include: {
    ingredients: true,
    instructions: true,
  },
});
return recipes;
};

// Get a single recipe by ID
export const getRecipeById = async (id: string) => {
  return await prisma.recipe.findUnique({ where: { id } });
};

export const createRecipe = async (data: {
  title: string;
  favorite: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  channel: string;
  duration: string;
  serving: string;
  ingredients: { name: string; quantity: string }[];
  instructions: { step: string; description: string }[];
}) => {
  return await prisma.recipe.create({
    data: {
      title: data.title,
      favorite: data.favorite,
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      image: data.image,
      channel: data.channel,
      duration: data.duration,
      serving: data.serving,
      ingredients: {
        create: data.ingredients,
      },
      instructions: {
        create: data.instructions.map((instruction) => ({
          ...instruction,
          step: String(instruction.step),
        })),
      },
    },
    include: {
      ingredients: true,
      instructions: true,
    },
  });
};

// Update a recipe
export const updateRecipe = async (id: string, data: any) => {``
  return await prisma.recipe.update({ where: { id }, data });
};

// Delete a recipe
export const deleteRecipe = async (id: string) => {
  return await prisma.recipe.delete({ where: { id } });
};
