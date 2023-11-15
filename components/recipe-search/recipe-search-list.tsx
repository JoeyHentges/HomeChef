"use client"

import { useEffect, useState } from "react"

import { RecipeTheme } from "@/types/recipe"
import { cn } from "@/lib/utils"
import { getRecipePath } from "@/utils/get-recipe-url"
import { ApiGetRecipes } from "@/app/api/recipes/route"

import { Icons } from "../icons"
import { RecipeSearchItem } from "./recipe-search-item"
import { fetchRecipes } from "./utils/fetch-recipes"
import { useRecipeSearch } from "./utils/recipe-search-context"

export function RecipeSearchList() {
  const [recipesLoading, setRecipesLoading] = useState<boolean>(true)
  const [recipes, setRecipes] = useState<ApiGetRecipes>()

  const { recipeSearch } = useRecipeSearch()

  useEffect(() => {
    async function fetch() {
      setRecipesLoading(true)
      const recipesRes = await fetchRecipes(recipeSearch)
      // Delay to make it less jarring - gives user time to load new items
      setTimeout(() => {
        setRecipes(recipesRes)
        setRecipesLoading(false)
      }, 250)
    }
    fetch()
  }, [recipeSearch])

  function RecipesList() {
    if (!recipes || recipes.length < 1) {
      return (
        <div className="absolute z-10 flex h-[100%] min-h-[296px] w-[100%] items-center justify-center text-lg md:text-2xl">
          No recipes found
        </div>
      )
    }
    return recipes.map((recipe) => {
      return (
        <RecipeSearchItem
          key={recipe.title}
          href={`/recipes/${getRecipePath(recipe.title, recipe.id)}`}
          image={recipe.image}
          title={recipe.title}
          description={recipe.description}
          rating={recipe.rating}
          reviewCount={recipe.reviewCount}
          cookTime={recipe.prepTime + recipe.cookTime + recipe.additionalTime}
          theme={recipe.theme.name as RecipeTheme}
        />
      )
    })
  }

  return (
    <div className="relative h-[100%] min-h-[296px] w-[100%]">
      {recipesLoading && (
        <div className="absolute z-10 flex h-[100%] w-[100%] items-center justify-center">
          <Icons.spinner className="h-auto w-[50px] animate-spin text-slate-400" />
        </div>
      )}
      <div
        className={cn(
          "group/list relative grid w-[auto] grid-cols-1 gap-8 xl:grid-cols-2",
          recipesLoading && "blur-sm"
        )}
      >
        <RecipesList />
      </div>
    </div>
  )
}
