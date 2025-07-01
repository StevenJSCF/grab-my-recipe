"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { cn } from "@/lib/utils"
import { RecipesPage } from "@/app/(authenticated)/Recipes/page"
import LandingPage from "@/components/LandingPage"

export default function Page() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }

  return (
    <div className="min-h-screen">
      <LandingPage/>

      {/* Desktop Sidebar */}
      {/* <SidebarNav isExpanded={sidebarExpanded} onToggle={toggleSidebar} /> */}

      {/* Main Content */}
      <div className={cn("transition-all duration-300 ease-in-out", sidebarExpanded ? "md:ml-64" : "md:ml-16")}>
        {/* <RecipesPage sidebarExpanded={sidebarExpanded} /> */}
      </div>
    </div>
  )
}

