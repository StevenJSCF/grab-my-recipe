import React, { useState } from "react";
import { RecipeType } from "@/lib/types";
import Image from "next/image";
import { Ingredient, Instruction } from "@/lib/generated/prisma";

type EditRecipeFormProps = {
  recipeData: RecipeType;
};

export default function EditRecipeForm({ recipeData }: EditRecipeFormProps) {
  // Form state
  const [title, setTitle] = useState(recipeData.title);
  const [channel, setChannel] = useState(recipeData.channel);
  const [duration, setDuration] = useState(recipeData.duration);
  const [serving, setServing] = useState(recipeData.serving);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    Array.isArray(recipeData.ingredients) ? recipeData.ingredients : []
  );
  const [instructions, setInstructions] = useState<Instruction[]>(
    Array.isArray(recipeData.instructions) ? recipeData.instructions : []
  );

  // Handlers for editing ingredients and instructions
  const handleIngredientChange = (
    idx: number,
    field: keyof Ingredient,
    value: string
  ) => {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === idx ? { ...ing, [field]: value } : ing))
    );
  };
  const handleInstructionChange = (idx: number, value: string) => {
    setInstructions((prev) =>
      prev.map((ins, i) => (i === idx ? { ...ins, description: value } : ins))
    );
  };

  // Add/remove ingredient/instruction
  const addIngredient = () =>
    setIngredients([
      ...ingredients,
      {
        id: Math.random().toString(36).slice(2),
        name: "",
        quantity: "",
        recipeId: recipeData.id || null,
      },
    ]);

  const removeIngredient = (idx: number) =>
    setIngredients(ingredients.filter((_, i) => i !== idx));
  const addInstruction = () =>
    setInstructions([
      ...instructions,
      {
        id: Math.random().toString(36).slice(2),
        recipeId: recipeData.id || null,
        step: (instructions.length + 1).toString(),
        description: "",
      },
    ]);
  const removeInstruction = (idx: number) =>
    setInstructions(instructions.filter((_, i) => i !== idx));

  // Submit handler (to be connected to API)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Remove id and recipeId from ingredients and instructions before sending prisma was complaining
    const cleanedIngredients = ingredients.map(({ name, quantity }) => ({
      name,
      quantity,
    }));
    const cleanedInstructions = instructions.map(({ step, description }) => ({
      step,
      description,
    }));
    const updatedRecipe = {
      ...recipeData,
      title,
      channel,
      duration,
      serving,
      ingredients: cleanedIngredients,
      instructions: cleanedInstructions,
    };
    console.log("Submitting Ingredients:", updatedRecipe.ingredients);
    console.log("Submitting Instructions:", updatedRecipe.instructions);
    updateRecipe(recipeData.id, {
      title: updatedRecipe.title,
      channel: updatedRecipe.channel,
      duration: updatedRecipe.duration,
      serving: updatedRecipe.serving,
      ingredients: updatedRecipe.ingredients,
      instructions: updatedRecipe.instructions,
    });
  };

  const updateRecipe = async (id: string, fieldsToUpdate: any) => {
    try {
      const res = await fetch("/api/recipe/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...fieldsToUpdate }),
      });

      if (!res.ok) {
        let errorText = await res.text();
        console.error("API error response:", errorText);
        throw new Error("Failed to update recipe");
      }
      const data = await res.json();
      console.log("Update response data:", data);
      // Invalidate and refetch recipes
      // queryClient.invalidateQueries({ queryKey: ["recipes"] });
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10"
    >
      <div className="flex flex-col gap-12">
        {/* Left: image and Info */}
        <div className="flex-1 flex flex-col items-center">
          <Image
            src={recipeData.image}
            alt="Recipe image"
            width={320}
            height={240}
            className="rounded-lg border border-orange-200 shadow"
          />
          <input
            className="mt-4 text-2xl font-bold text-orange-700 dark:text-orange-300 text-center bg-transparent border-b border-orange-200 focus:outline-none focus:border-orange-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="text-md text-gray-700 dark:text-gray-300 mt-1 text-center bg-transparent border-b border-gray-200 focus:outline-none focus:border-orange-400"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          />
          <div className="flex justify-center gap-4 mt-2">
            <input
              className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-semibold w-28 text-center border border-orange-200 focus:outline-none focus:border-orange-400"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Ready In"
            />
            <input
              className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-semibold w-20 text-center border border-orange-200 focus:outline-none focus:border-orange-400"
              value={serving}
              onChange={(e) => setServing(e.target.value)}
              placeholder="Serves"
            />
          </div>
        </div>
        {/* Right: Ingredients and Instructions */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2 text-orange-600 dark:text-orange-300">
              Ingredients
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {ingredients.map((ingredient, idx) => (
                <li
                  key={idx}
                  className="flex gap-2 items-center text-gray-800 dark:text-gray-200"
                >
                  <input
                    className="flex-1 bg-transparent border-b border-gray-200 focus:outline-none focus:border-orange-400 px-1"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(idx, "name", e.target.value)
                    }
                    placeholder="Ingredient name"
                  />
                  <input
                    className="w-20 bg-transparent border-b border-gray-200 focus:outline-none focus:border-orange-400 px-1 text-right"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleIngredientChange(idx, "quantity", e.target.value)
                    }
                    placeholder="Qty"
                  />
                  <button
                    type="button"
                    className="text-red-500 ml-2"
                    onClick={() => removeIngredient(idx)}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-2 text-orange-600 dark:text-orange-300 font-semibold"
              onClick={addIngredient}
            >
              + Add Ingredient
            </button>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-orange-600 dark:text-orange-300">
              Instructions
            </h3>
            <ol className="list-decimal list-inside space-y-1">
              {instructions.map((instruction, idx) => (
                <li
                  key={idx}
                  className="flex gap-2 items-center text-gray-800 dark:text-gray-200"
                >
                  <input
                    className="flex-1 bg-transparent border-b border-gray-200 focus:outline-none focus:border-orange-400 px-1"
                    value={instruction.description}
                    onChange={(e) =>
                      handleInstructionChange(idx, e.target.value)
                    }
                    placeholder={`Step ${idx + 1}`}
                  />
                  <button
                    type="button"
                    className="text-red-500 ml-2"
                    onClick={() => removeInstruction(idx)}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ol>
            <button
              type="button"
              className="mt-2 text-orange-600 dark:text-orange-300 font-semibold"
              onClick={addInstruction}
            >
              + Add Instruction
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg shadow"
        >
          Save
        </button>
      </div>
    </form>
  );
}
