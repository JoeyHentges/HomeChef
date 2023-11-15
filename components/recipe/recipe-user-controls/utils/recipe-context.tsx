import React, { useMemo } from "react"

import { FullRecipe } from "../../recipe.types"
import { buildInitialRecipeValues } from "./build-initial-recipe-values"
import { recipeUserControlsEmitter } from "./recipe-user-controls-event-emitter"

interface RecipeContext {
  recipe?: FullRecipe
  recipeChanged?: boolean
  setTheme: (value: string) => void
  setTags: (value: string[]) => void
  setView: (isPublic: boolean, isFeatured: boolean) => void
}

const RecipeContext = React.createContext<RecipeContext>({
  recipe: undefined,
  recipeChanged: false,
  setTheme: () => null,
  setTags: () => null,
  setView: () => null,
})

export const useRecipe = () => React.useContext(RecipeContext)

export function RecipeContextProvider({
  children,
  initialValues,
}: {
  children: React.ReactNode
  initialValues: FullRecipe
}) {
  const builtInitialValues = useMemo(
    () => buildInitialRecipeValues(initialValues),
    []
  )
  const [recipe, setRecipe] = React.useState<FullRecipe>(builtInitialValues)

  const recipeChanged =
    JSON.stringify(builtInitialValues) !== JSON.stringify(recipe)

  recipeUserControlsEmitter.on("changeTitle", (title) => {
    setRecipe({
      ...recipe,
      title,
    })
  })

  recipeUserControlsEmitter.on("changeInfo", (recipeInfo) => {
    const { difficulty, prepTime, cookTime, additionalTime, servings } =
      recipeInfo
    setRecipe({
      ...recipe,
      prepTime,
      cookTime,
      additionalTime,
      servings,
      difficulty: {
        name: difficulty,
      },
    })
  })

  recipeUserControlsEmitter.on("changeDescription", (description) => {
    setRecipe({
      ...recipe,
      description,
    })
  })

  recipeUserControlsEmitter.on("changeIngredients", (ingredients) => {
    setRecipe({
      ...recipe,
      ingredients,
    })
  })

  function setTheme(value: string) {
    recipeUserControlsEmitter.emit("changeTheme", value)
    setRecipe({
      ...recipe,
      theme: {
        name: value,
      },
    })
  }

  function setTags(value: string[]) {
    setRecipe({
      ...recipe,
      tags: value.map((name) => ({
        name,
      })),
    })
  }

  function setView(isPublic: boolean, isFeatured: boolean) {
    setRecipe({
      ...recipe,
      public: isPublic,
      featured: isFeatured,
    })
  }

  const contextValues: RecipeContext = {
    recipe,
    recipeChanged,
    setTheme,
    setTags,
    setView,
  }

  return (
    <RecipeContext.Provider value={contextValues}>
      {children}
    </RecipeContext.Provider>
  )
}
