import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { absoluteUrl } from "@/lib/utils"
import { Recipe } from "@/components/recipe"
import { ApiGetRecipe } from "@/app/api/recipes/[recipeId]/route"

interface RecipePageProps {
  params: {
    slug: string[]
  }
}

async function getRecipeFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/")
  const id = slug.split("-").at(-1) as string
  const recipeResponse = await fetch(absoluteUrl(`/api/recipes/${id}`), {
    cache: "no-cache",
  })
  const recipe: ApiGetRecipe = await recipeResponse.json()

  if (!recipe) {
    null
  }

  return recipe
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const recipe = await getRecipeFromParams(params)

  if (!recipe) {
    return {}
  }

  return {
    title: `Edit ${recipe.title}`,
    description: "Edit your recipe details.",
  }
}

export default async function EditRecipePage(props: RecipePageProps) {
  const { params } = props
  const recipe = await getRecipeFromParams(params)
  const user = await getCurrentUser()

  if (!recipe) {
    return notFound()
  }

  const { author } = recipe

  const isUserRecipe = author.id === user?.id
  if (!isUserRecipe) {
    return notFound()
  }

  return (
    <div className="border-t border-slate-300">
      <Recipe
        enableUserControls={true}
        recipe={recipe}
        disableRating={!user || recipe.author.id === user.id}
      />
    </div>
  )
}
