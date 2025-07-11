import React from "react";

export function UploadRecipeSkeleton() {
  return (
    <div className="animate-pulse w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10 mt-8">
      <div className="flex flex-col gap-12">
        {/* Thumbnail and Info */}
        <div className="flex flex-col items-center">
          <div className="w-[320px] h-[240px] bg-gray-300 rounded-lg border border-orange-200 shadow mb-4" />
          <div className="h-8 w-2/3 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-1/3 bg-gray-200 rounded mb-1" />
          <div className="h-4 w-1/4 bg-gray-200 rounded mb-2" />
          <div className="flex justify-center gap-4 mt-2 w-full">
            <div className="h-6 w-32 bg-orange-100 dark:bg-orange-900 rounded-full" />
            <div className="h-6 w-32 bg-orange-100 dark:bg-orange-900 rounded-full" />
          </div>
        </div>
        {/* Ingredients and Instructions */}
        <div className="flex flex-col gap-8 md:flex-col">
          {/* Ingredients */}
          <div>
            <div className="h-6 w-32 bg-orange-200 rounded mb-4" />
            <ul className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="flex justify-between">
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  <div className="h-4 w-1/4 bg-gray-100 rounded" />
                </li>
              ))}
            </ul>
            <div className="h-3 w-1/3 bg-gray-100 rounded mt-2" />
          </div>
          {/* Instructions */}
          <div>
            <div className="h-6 w-32 bg-orange-200 rounded mb-4" />
            <ul className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="flex items-center">
                  <div className="h-4 w-8 bg-gray-200 rounded mr-2" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
