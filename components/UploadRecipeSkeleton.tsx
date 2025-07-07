import React from 'react'

export function UploadRecipeSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col">
        {/* Title */}
        <div className="mb-8">
          <div className="h-12 w-2/3 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-1/3 bg-gray-200 rounded mb-1" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
        </div>
        {/* Youtube Video Info */}
        <div className="flex justify-center mb-6">
          <div className="w-[400px] h-[300px] bg-gray-200 rounded" />
        </div>
        {/* Ingredients and Instructions */}
        <div className="flex flex-row gap-8">
          {/* Ingredients */}
          <div className="flex-1 border-2 p-4">
            <div className="h-6 w-1/2 bg-gray-300 rounded mb-4" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
          {/* Instructions */}
          <div className="flex-1 border-2 p-4">
            <div className="h-6 w-1/2 bg-gray-300 rounded mb-4" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <div className="h-4 w-8 bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
