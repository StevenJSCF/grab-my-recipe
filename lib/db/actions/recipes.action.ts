import prisma from "@/lib/prisma";

// Get all recipes
// Here I will need to get all recipes by userId
export const getRecipes = async (filter = {}) => {
  const recipes = await prisma.recipe.findMany({
    where: filter,
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

// Update a recipe favorite
export const updateFavorite= async (id: string, data: any) => {
  ``;
  return await prisma.recipe.update({ where: { id }, data });
};

// update all recipe fields
export const updateRecipe = async (
  id: string,
  data: {
    title: string;
    favorite: boolean;
    image: string;
    channel: string;
    duration: string;
    serving: string;
    updatedAt: Date;
    ingredients: { name: string; quantity: string }[];
    instructions: { step: string; description: string }[];
  }
) => {
  return await prisma.recipe.update({
    where: { id },
    data: {
      title: data.title,
      favorite: data.favorite,
      image: data.image,
      channel: data.channel,
      duration: data.duration,
      serving: data.serving,
      updatedAt: data.updatedAt,
      // Delete existing ones and recreate new ones
      ingredients: {
        deleteMany: {}, // deletes all ingredients related to this recipe
        create: data.ingredients.map(({ name, quantity }) => ({
          name,
          quantity,
        })),
      },
      instructions: {
        deleteMany: {}, // deletes all instructions related to this recipe
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

// Delete a recipe
export const deleteRecipe = async (id: string) => {
  return await prisma.recipe.delete({ where: { id } });
};
