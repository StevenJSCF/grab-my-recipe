"use client";
import React from "react";
import { BookOpen, Upload } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/user/getUserById");
      if (!res.ok) return null;
      const data = await res.json();
      return data.user;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-4">
      <div className="container max-w-3xl mx-auto flex flex-col items-center justify-center py-10">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
            {user
              ? `Welcome to GrabMyRecipe, ${user.name}!`
              : "Welcome to GrabMyRecipe!"}
          </h1>
        </div>

        {/* Profile Image */}
        <div className="mb-8">
          <img
            src={`/profile-pics/${user.image}`}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-orange-500 object-cover"
          />
        </div>

        {/* Description */}
        <p className="text-center text-base sm:text-lg text-gray-700 mb-8 max-w-md">
          Your personal recipe dashboard. Quickly access your recipes, upload
          new ones, or check your favorites. Stay organized and inspired!
        </p>

        {/* Action Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <Link
            href="/Recipes"
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow group border border-orange-100"
          >
            <BookOpen className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-lg text-gray-900">
              My Recipes
            </span>
          </Link>
          <Link
            href="/UploadRecipe"
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow group border border-orange-100"
          >
            <Upload className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-lg text-gray-900">
              Upload Recipe
            </span>
          </Link>
        </div>

        {/* Info Section */}
        <div className="w-full bg-white rounded-xl shadow p-6 border border-orange-50">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Important Info
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
            <li>The app supports videos in any language</li>
            <li>
              The longer the video, the more it will take to output the data.
            </li>
            <li>
              Some videos may not work due to their format or content. Please
              check the video if it does not work.
            </li>
            <li>The app is still in beta, so expect some bugs and issues.</li>
            <li>
              Please report any bugs to{" "}
              <a
                href="mailto:stevenjscf@gmail.com"
                className="underline text-orange-500 hover:text-orange-700"
              >
                stevenchiang12300@gmail.com
              </a>
              . Thank you!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
