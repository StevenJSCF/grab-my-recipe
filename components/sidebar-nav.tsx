"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Upload, BookOpen, Heart, Settings, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

const navigationItems = [
  { icon: Home, label: "Home", href: "/Home" },
  { icon: Upload, label: "Upload Recipe", href: "/UploadRecipe" },
  { icon: BookOpen, label: "My Recipes", href: "/Recipes" },
  { icon: Heart, label: "Favorites", href: "/Favorites" },
  { icon: Settings, label: "Settings", href: "/Settings" },
];

export function SidebarNav() {
  const isMobile = useMobile();
  const [activeItem, setActiveItem] = useState("My Recipes");

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold">GrabMyRecipe</span>
              </div>
            </div>
            <nav className="flex-1 p-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveItem(item.label)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                    activeItem === item.label
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                  scroll={false}
                  prefetch={true}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop sidebar: collapsed on md, expanded on lg
  return (
    <div
      className={cn(
        // Responsive width: narrow on md, wide on lg
        "hidden md:flex md:w-16 lg:w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out h-screen fixed left-0 top-0 z-40"
      )}
    >
      {/* Show logo and name on large screens, only logo on medium screens */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        {/* Show name only on large screens */}
        <span className="hidden lg:inline text-lg font-semibold ml-2">
          GrabMyRecipe
        </span>
      </div>

      <nav className="flex-1 p-2 overflow-y-auto">
        {navigationItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setActiveItem(item.label)}
            className={cn(
              // Adjust padding for collapsed/expanded
              "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 mb-1",
              activeItem === item.label
                ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                : "text-gray-700 dark:text-gray-300",
              // Center icon when collapsed
              "md:justify-center lg:justify-start"
            )}
            scroll={false}
            prefetch={true}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {/* Hide label on md, show on lg */}
            <span className="hidden lg:inline">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
