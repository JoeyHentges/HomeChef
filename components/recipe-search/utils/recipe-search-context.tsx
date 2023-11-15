import React from "react"

import { RecipeTheme } from "@/types/recipe"

import { SortBy } from "../recipe-search-sort-dropdown"

export type RecipeSearch = {
  input: string
  filter: RecipeTheme | ""
  sortBy: SortBy
}

interface RecipeSearchContext {
  recipeSearch: RecipeSearch
  setInput: (value: string) => void
  setFilter: (value: RecipeTheme | "") => void
  setSortBy: (value: SortBy) => void
}

const RecipeSearchContext = React.createContext<RecipeSearchContext>({
  recipeSearch: {
    input: "",
    filter: "",
    sortBy: "rating",
  },
  setInput: () => null,
  setFilter: () => null,
  setSortBy: () => null,
})

export const useRecipeSearch = () => React.useContext(RecipeSearchContext)

export function RecipeSearchContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [recipeSearch, setRecipeSearch] = React.useState<RecipeSearch>({
    input: "",
    filter: "",
    sortBy: "rating",
  })

  function setInput(value: string) {
    setRecipeSearch({
      ...recipeSearch,
      input: value,
    })
  }

  function setFilter(value: RecipeTheme | "") {
    setRecipeSearch({
      ...recipeSearch,
      filter: value,
    })
  }

  function setSortBy(value: SortBy) {
    setRecipeSearch({
      ...recipeSearch,
      sortBy: value,
    })
  }

  const contextValues: RecipeSearchContext = {
    recipeSearch,
    setInput,
    setFilter,
    setSortBy,
  }

  return (
    <RecipeSearchContext.Provider value={contextValues}>
      {children}
    </RecipeSearchContext.Provider>
  )
}
