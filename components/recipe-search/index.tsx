"use client"

import { RecipeSearchFilters } from "./recipe-search-filters"
import { RecipeSearchInput } from "./recipe-search-input"
import { RecipeSearchList } from "./recipe-search-list"
import { RecipeSearchSortDropdown } from "./recipe-search-sort-dropdown"
import { RecipeSearchContextProvider } from "./utils/recipe-search-context"

export function RecipeSearch() {
  return (
    <RecipeSearchContextProvider>
      <div className="container py-12 lg:py-24">
        <div className="flex flex-col justify-between lg:flex-row">
          <RecipeSearchInput />
          <span className="mt-8 hidden lg:block">
            <RecipeSearchSortDropdown />
          </span>
        </div>
        <div className="flex flex-col gap-x-8 pt-4 sm:flex-row lg:pt-12">
          <div>
            <span className="block pb-2 lg:hidden">
              <RecipeSearchSortDropdown />
            </span>
            <RecipeSearchFilters />
          </div>
          <RecipeSearchList />
        </div>
      </div>
    </RecipeSearchContextProvider>
  )
}
