import { RecipeIngredient } from "@prisma/client"

import { RecipeDifficulty } from "@/types/recipe"
import { EventEmitter } from "@/utils/EventEmitter"

type RecipeInfo = {
  difficulty: RecipeDifficulty
  prepTime: number
  cookTime: number
  additionalTime: number
  servings: number
}

type EventMap = {
  changeTitle: [title: string]
  changeInfo: [recipeInfo: RecipeInfo]
  changeDescription: [description: string]
  changeTheme: [theme: string]
  changeIngredients: [ingredients: Omit<RecipeIngredient, "id" | "recipeId">[]]
}

export const recipeUserControlsEmitter = new EventEmitter<EventMap>()
