"use client"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { adventPro } from "@/styles/fonts"

import { useRecipeSearch } from "./utils/recipe-search-context"

export function RecipeSearchInput() {
  const { recipeSearch, setInput } = useRecipeSearch()

  return (
    <div className="flex w-[100%] flex-col gap-x-8 lg:flex-row lg:items-center">
      <p
        className={cn(
          "pb-3 text-6xl font-bold sm:w-[200px] lg:pb-0",
          adventPro.className
        )}
      >
        Recipes
      </p>
      <div className="flex w-[100%] gap-x-2 rounded-3xl border border-slate-400 px-4 py-[0.25em] transition focus-within:border-slate-600 lg:-mb-4 lg:w-[50%] lg:py-[0.5em]">
        <Icons.search className="w-4 lg:mt-[1px] lg:w-5" />
        <input
          className="w-[100%] bg-transparent text-base focus:outline-none lg:text-lg"
          placeholder="Search recipes and more..."
          value={recipeSearch.input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  )
}
