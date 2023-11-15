"use client"

import { RecipeTheme } from "@/types/recipe"
import { cn } from "@/lib/utils"
import { Icon, Icons } from "@/components/icons"

import { useRecipeSearch } from "./utils/recipe-search-context"

export interface RecipeSearchFilterItemPros {
  icon: Icon
  label: RecipeTheme
}

export function RecipeSearchFilterItem(props: RecipeSearchFilterItemPros) {
  const { icon, label } = props

  const { recipeSearch, setFilter } = useRecipeSearch()

  const IconElement = Icons[icon]

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-x-3 whitespace-nowrap rounded-3xl border border-slate-300 px-2 py-2 pr-4 transition",
        recipeSearch.filter === label
          ? "bg-amber-300 shadow-xl"
          : "hover:bg-amber-200"
      )}
      onClick={() => {
        if (recipeSearch.filter === label) {
          return setFilter("")
        }
        setFilter(label)
      }}
    >
      <div className="rounded-full bg-white p-1">
        <IconElement className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <p className="text-sm font-semibold capitalize">{label}</p>
    </div>
  )
}
