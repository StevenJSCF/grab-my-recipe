import React from "react";
import { RecipeType } from "@/lib/types";
import Image from "next/image";
import { Ingredient, Instruction } from "@/lib/generated/prisma";

type ReactipeCardProps = {
  recipeData: RecipeType;
};

export default function RecipeCard({ recipeData }: ReactipeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-10">
      <div className="flex flex-col gap-12">
        {" "}
        {/* Remove md:flex-row to always stack */}
        {/* Left: image and Info */}
        <div className="flex-1 flex flex-col items-center">
          <Image
            src={recipeData.image}
            alt="Recipe image"
            width={320}
            height={240}
            className="rounded-lg border border-orange-200 shadow"
          />
          <h2 className="text-2xl font-bold mt-4 text-orange-700 text-center">
            {recipeData.title}
          </h2>
          <p className="text-md text-gray-700 mt-1 text-center">
            <span className="font-semibold">Channel:</span> {recipeData.channel}
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
              Ready In: {recipeData.duration}
            </span>
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
              Serves: {recipeData.serving}
            </span>
          </div>
        </div>
        {/* Right: Ingredients and Instructions */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2 text-orange-600">
              Ingredients
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {Array.isArray(recipeData.ingredients) &&
                recipeData.ingredients.map(
                  (ingredient: Ingredient, idx: number) => (
                    <li
                      key={idx}
                      className="flex justify-between text-gray-800"
                    >
                      <span>{ingredient.name}</span>
                      <span className="text-gray-500">
                        {ingredient.quantity}
                      </span>
                    </li>
                  )
                )}
            </ul>
            <p className="text-gray-400 mt-2 text-xs">
              Note: Ingredients without a specific quantity are marked as
              &quot;N/A&quot;.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-orange-600">
              Instructions
            </h3>
            <ol className="list-decimal list-inside space-y-1">
              {Array.isArray(recipeData.instructions) &&
                recipeData.instructions.map(
                  (instruction: Instruction, idx: number) => (
                    <li key={idx} className="text-gray-800">
                      <span className="font-semibold">
                        {instruction.description}
                      </span>
                    </li>
                  )
                )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
