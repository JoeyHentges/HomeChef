import { Metadata } from "next"
import { notFound } from "next/navigation"

import { env } from "@/env.mjs"
import { getCurrentUser } from "@/lib/session"
import { absoluteUrl } from "@/lib/utils"
import { Recipe } from "@/components/recipe"
import { ApiGetRecipeRating } from "@/app/api/recipe-ratings/route"
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

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", recipe.title)
  ogUrl.searchParams.set("type", "Recipe")

  return {
    title: recipe.title,
    description: recipe.description,
    authors: [
      {
        name: recipe.author.name || "",
      },
    ],
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      type: "article",
      url: absoluteUrl(
        `/recipes/${recipe.title.toLowerCase().replace(/\s/g, "-")}-${
          recipe.id
        }`
      ),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.description,
      images: [ogUrl.toString()],
    },
  }
}

export default async function RecipePage(props: RecipePageProps) {
  const { params } = props
  const recipe = await getRecipeFromParams(params)
  const user = await getCurrentUser()

  if (!recipe) {
    return notFound()
  }

  const { author, public: isPublic } = recipe

  const isUserRecipe = author.id === user?.id
  if (!isUserRecipe && !isPublic) {
    return notFound()
  }

  let recipeRating: ApiGetRecipeRating | undefined = undefined
  if (user) {
    const recipeRatingResponse = await fetch(
      absoluteUrl(`/api/recipe-ratings?userId=${user.id}&recipeId=${recipe.id}`)
    )
    recipeRating = await recipeRatingResponse.json()
  }

  return (
    <div className="border-t border-slate-300">
      <Recipe
        enableUserControls={false}
        showEditButton={isUserRecipe}
        recipe={recipe}
        disableRating={!user || recipe.author.id === user.id}
        userRating={recipeRating}
      />
    </div>
  )
}
