"use client"

import { recipeThemes } from "@/utils/constants"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useRecipe } from "./utils/recipe-context"

export function RecipeUserControlsThemeSelect() {
  const { recipe, setTheme } = useRecipe()

  return (
    <div className="flex items-center gap-x-1 rounded-lg border border-slate-300 px-4">
      <p className="whitespace-nowrap text-sm font-medium">Theme: </p>
      <Select
        value={recipe?.theme.name}
        onValueChange={(value) => setTheme(value)}
      >
        <SelectTrigger className="w-[220px] border-none px-0 text-sm capitalize ring-transparent ring-offset-transparent focus:ring-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-scroll">
          {recipeThemes.map((option) => (
            <SelectItem key={option} value={option} className="capitalize">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
