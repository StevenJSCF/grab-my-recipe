import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { RecipeType } from "@/lib/types";
import Image from "next/image";
import { Ingredient, Instruction } from "@/lib/generated/prisma";

type EditRecipeFormProps = {
  recipeData: RecipeType;
  onClose?: () => void;
  onSave?: () => void;
};

export default function EditRecipeForm({
  recipeData,
  onClose,
  onSave,
}: EditRecipeFormProps) {
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

  // Modal state for editing a single instruction
  const [editingInstructionIdx, setEditingInstructionIdx] = useState<
    number | null
  >(null);
  const [editingInstructionValue, setEditingInstructionValue] = useState("");

  // Open modal for editing instruction
  const openInstructionModal = (idx: number) => {
    setEditingInstructionIdx(idx);
    setEditingInstructionValue(instructions[idx]?.description || "");
  };

  // Save changes from modal
  const saveInstructionModal = () => {
    if (editingInstructionIdx !== null) {
      setInstructions((prev) =>
        prev.map((ins, i) =>
          i === editingInstructionIdx
            ? { ...ins, description: editingInstructionValue }
            : ins
        )
      );
      setEditingInstructionIdx(null);
    }
  };

  // Close modal without saving
  const closeInstructionModal = () => {
    setEditingInstructionIdx(null);
  };

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Remove id and recipeId from ingredients and instructions before sending
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
    try {
      await updateRecipe(recipeData.id, {
        title: updatedRecipe.title,
        channel: updatedRecipe.channel,
        duration: updatedRecipe.duration,
        serving: updatedRecipe.serving,
        ingredients: updatedRecipe.ingredients,
        instructions: updatedRecipe.instructions,
      });
      toast.success("Recipe updated!");
      if (onSave) onSave();
      else if (onClose) onClose();
    } catch (error) {
      toast.error("Failed to update recipe");
    }
  };

  const updateRecipe = async (id: string, fieldsToUpdate: any) => {
    const res = await fetch("/api/recipe/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...fieldsToUpdate }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API error response:", errorText);
      throw new Error("Failed to update recipe");
    }
    const data = await res.json();
    console.log("Update response data:", data);
    // queryClient.invalidateQueries({ queryKey: ["recipes"] });
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
                  <button
                    type="button"
                    className="flex-1 text-left bg-transparent border-b border-gray-200 focus:outline-none focus:border-orange-400 px-1 hover:bg-orange-50 dark:hover:bg-orange-950 rounded"
                    onClick={() => openInstructionModal(idx)}
                    title="Click to edit full instruction"
                  >
                    {instruction.description.length > 60
                      ? instruction.description.slice(0, 60) + "..."
                      : instruction.description || `Step ${idx + 1}`}
                  </button>
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
            {/* Modal for editing a single instruction */}
            {editingInstructionIdx !== null && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
                onClick={closeInstructionModal}
              >
                <div
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-lg w-full relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                    onClick={closeInstructionModal}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <h3 className="text-lg font-bold mb-2 text-orange-600 dark:text-orange-300">
                    Edit Step {editingInstructionIdx + 1}
                  </h3>
                  <textarea
                    className="w-full min-h-[120px] border border-gray-300 dark:border-gray-700 rounded p-2 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={editingInstructionValue}
                    onChange={(e) => setEditingInstructionValue(e.target.value)}
                    placeholder="Edit instruction..."
                    autoFocus
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg shadow"
                      onClick={closeInstructionModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg shadow"
                      onClick={saveInstructionModal}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
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
