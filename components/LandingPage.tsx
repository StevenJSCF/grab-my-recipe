import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, FileText, Save, Smartphone, BookOpen, Link, ArrowRight, Upload, Zap, Heart } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">GrabMyRecipe</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Turn Screenshots into
            <span className="text-orange-500 block">Perfect Recipes</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Upload a screenshot of recipe ingredients from YouTube or anywhere else. Our smart OCR technology extracts
            and formats everything perfectly, so you can save and organize your favorite recipes effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform any recipe screenshot into a perfectly formatted, saveable recipe in just three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center p-6 border-2 hover:border-orange-200 transition-colors">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Upload Screenshot</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simply upload a screenshot of recipe ingredients from YouTube, social media, or any source.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-2 hover:border-orange-200 transition-colors">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Extract & Format</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our advanced OCR technology automatically extracts and formats the ingredients list perfectly.
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
                Add cooking instructions, YouTube links, and save to your personal recipe collection.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to build and organize your perfect recipe collection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Camera className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Smart OCR Technology</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced optical character recognition that accurately extracts ingredients from any screenshot.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Recipe Organization</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Save, categorize, and organize all your recipes in one convenient location.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Custom Instructions</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Add your own cooking instructions, notes, and modifications to any recipe.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Link className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">YouTube Integration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Link recipes directly to their YouTube videos for easy reference while cooking.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Mobile Friendly</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Access your recipes anywhere, anytime with our responsive design.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Collection</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Build your personal recipe library with favorites, ratings, and custom tags.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Cooking?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of home cooks who have already transformed their recipe collection. Sign up today and never
            lose a recipe again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Create Free Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 border-white text-white hover:bg-white hover:text-orange-500"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
            <p>&copy; 2024 GrabMyRecipe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
