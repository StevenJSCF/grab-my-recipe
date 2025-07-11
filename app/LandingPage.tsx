import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Camera,
  FileText,
  Save,
  Smartphone,
  BookOpen,
  Link,
  ArrowRight,
  Upload,
  Zap,
  Heart,
} from "lucide-react";
import AuthButton from "../components/AuthButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            GrabMyRecipe
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <AuthButton />
          <ThemeToggle />
        </div>
      </header>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Turn Screenshots into
            <span className="text-orange-500 block">Perfect Recipes</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Upload a cooking YouTube video URL. This app will extract and format everything
            perfectly, so you can save and organize your favorite recipes
            effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
            >
              Try it now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform any YouTube video recipe into a perfectly formatted, saveable
            recipe in just three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center p-6 border-2 hover:border-orange-200 transition-colors">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                1. Paste URL
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simply paste the URL of a cooking YouTube video.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 hover:border-orange-200 transition-colors">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                2. Extract & Format
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our technology automatically extracts and formats
                the ingredients list and instructions perfectly.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 hover:border-orange-200 transition-colors">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Save className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Save & Access</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Review and enjoy the recipe!.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">GrabMyRecipe</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-orange-400 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Terms
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 GrabMyRecipe. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
