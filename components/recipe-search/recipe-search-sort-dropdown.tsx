"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useRecipeSearch } from "./utils/recipe-search-context"

export type SortBy = "rating" | "newest" | "reviews"

export function RecipeSearchSortDropdown() {
  const { recipeSearch, setSortBy } = useRecipeSearch()

  return (
    <div className="flex items-center gap-x-1 rounded-3xl bg-white px-4">
      <p className="whitespace-nowrap text-base lg:text-lg">Sort by:</p>
      <Select
        value={recipeSearch.sortBy}
        onValueChange={(value: SortBy) => setSortBy(value)}
      >
        <SelectTrigger className="w-[100px] border-none bg-white px-0 text-base font-semibold ring-transparent ring-offset-transparent focus:ring-transparent lg:text-lg">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating">Rating</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="reviews">Reviews</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
