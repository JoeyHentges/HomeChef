import { RecipeTheme } from "@/types/recipe"

export const recipeImage = (tag: RecipeTheme) => {
  return `/images/recipes/themes/${tag}.png`
}
