"use client"

import { useState } from "react"
import { RecipeIngredient } from "@prisma/client"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

import { recipeUserControlsEmitter } from "../recipe-user-controls/utils/recipe-user-controls-event-emitter"
import { RecipeIngredientsListDialog } from "./recipe-ingredients-list-dialog"

interface RecipeIngredientsListProps {
  ingredients: Omit<RecipeIngredient, "id" | "recipeId">[]
  enableUserControls?: boolean
}

export function RecipeIngredientsList(props: RecipeIngredientsListProps) {
  const { ingredients: initialIngredients, enableUserControls } = props

  const [ingredients, setIngredients] =
    useState<Omit<RecipeIngredient, "id" | "recipeId">[]>(initialIngredients)

  recipeUserControlsEmitter.on("changeIngredients", (ingredients) => {
    setIngredients(ingredients)
  })

  return (
    <div>
      <div className="pb-2 md:pb-4">
        <span className={cn(enableUserControls ? "hidden lg:block" : "hidden")}>
          <RecipeIngredientsListDialog ingredients={ingredients} />
        </span>
        <p
          className={cn(
            "text-base font-bold md:text-xl",
            enableUserControls ? "block lg:hidden" : "block"
          )}
        >
          Ingredients
        </p>
      </div>
      <ul className="flex flex-col gap-y-4 md:gap-y-2">
        {ingredients
          .sort((a, b) => a.number - b.number)
          .map((ingredient) => (
            <li
              key={`recipeingredientlist-${ingredient.number}-${ingredient.name}`}
              className="flex items-center space-x-2"
            >
              <Checkbox id={ingredient.name} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={ingredient.name}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
                >
                  {ingredient.quantity} {ingredient.name}
                  {ingredient.description && `, ${ingredient.description}`}
                </label>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
