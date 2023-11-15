"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useRecipe } from "./utils/recipe-context"

export function RecipeUserControlsSwitches() {
  const { recipe, setView } = useRecipe()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2">
            <Switch
              id="public"
              checked={recipe?.public}
              onCheckedChange={(value) => {
                let featured = recipe?.featured || false
                if (value === false) {
                  featured = false
                }
                setView(value, featured)
              }}
            />
            <Label htmlFor="public">Public</Label>
          </div>
        </TooltipTrigger>
        <TooltipContent>Your recipe can be found by it's url.</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={recipe?.featured}
              onCheckedChange={(value) =>
                setView(recipe?.public || false, value)
              }
              disabled={!recipe?.public}
            />
            <Label htmlFor="featured">Featured</Label>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {!recipe?.public
            ? "Your recipe must be public if you want to feature it."
            : "Your recipe will be featured in public search results."}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
