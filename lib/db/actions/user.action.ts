import prisma from "@/lib/prisma";

// Get all recipes
// Here I will need to get all recipes by userId
export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (
  id: string,
  data: Partial<{ name: string, username: string }>
) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};
