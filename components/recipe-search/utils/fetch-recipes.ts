import { ApiGetRecipes } from "@/app/api/recipes/route"

import { RecipeSearch } from "./recipe-search-context"

export async function fetchRecipes(recipeSearch: RecipeSearch) {
  const { sortBy, filter, input } = recipeSearch
  let orderBy = ""
  switch (sortBy) {
    case "rating": {
      orderBy = "rating"
      break
    }
    case "newest": {
      orderBy = "updatedAt"
      break
    }
    case "reviews": {
      orderBy = "reviewCount"
      break
    }
  }
  let recipesUrl = `/api/recipes?featured=true&orderBy=${orderBy}`
  if (filter !== "") {
    recipesUrl += `&theme=${filter}`
  }
  if (input !== "") {
    recipesUrl += `&title=${input}`
  }
  try {
    const recipesResponse = await fetch(recipesUrl)
    const recipesJson: ApiGetRecipes = await recipesResponse.json()
    return recipesJson
  } catch (error) {
    console.log("Recipe search error", error)
    throw new Error("Recipe Search Error")
  }
}
