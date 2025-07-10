import UploadRecipePage from "./(authenticated)/UploadRecipe/page"
import  RecipesPage  from "./(authenticated)/Recipes/page"
export default function Page() {
  return (
    <div className="min-h-screen">
      {/* <UploadRecipePage/> */}
      <RecipesPage/>
    </div>
  )
}

