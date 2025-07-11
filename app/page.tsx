import UploadRecipePage from "./(authenticated)/UploadRecipe/page";
import RecipesPage from "./(authenticated)/Recipes/page";
import { SidebarNav } from "@/components/sidebar-nav";
import LandingPage from "@/app/LandingPage";
import HomePage from "./(authenticated)/Home/page";

export default function Page() {
  return (
      <main>
              <SidebarNav /> 
        <HomePage />
      </main>
  );
}
