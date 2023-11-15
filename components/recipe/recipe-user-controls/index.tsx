"use client"

import { MultiSelectDropdown } from "@/components/multi-select-dropdown"

import { FullRecipe } from "../recipe.types"
import { RecipeUserControlsButtons } from "./recipe-user-controls-buttons"
import { RecipeUserControlsSwitches } from "./recipe-user-controls-switches"
import { RecipeUserControlsThemeSelect } from "./recipe-user-controls-theme-select"
import { RecipeContextProvider } from "./utils/recipe-context"

interface RecipeUserControlsProps {
  recipe: FullRecipe
}

export function RecipeUserControls(props: RecipeUserControlsProps) {
  const { recipe } = props

  return (
    <RecipeContextProvider initialValues={recipe}>
      <div className="border-b border-slate-300">
        <div className="container hidden items-center justify-between bg-background py-2 lg:flex">
          <div className="flex gap-x-4">
            <RecipeUserControlsThemeSelect />
            <MultiSelectDropdown
              label="Tags (4)"
              dropdownLabel="Available Tags"
            />
            <RecipeUserControlsSwitches />
          </div>
          <RecipeUserControlsButtons />
        </div>

        <div className="container justify-center py-4 text-center lg:hidden">
          <p className="font-semibold text-red-500">
            You can only edit your recipe in desktop view.
          </p>
        </div>
      </div>
    </RecipeContextProvider>
  )
}
