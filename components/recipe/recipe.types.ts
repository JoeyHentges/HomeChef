import {
  Recipe,
  RecipeDifficulty,
  RecipeIngredient,
  RecipeInstruction,
  RecipeKitchenTool,
  RecipeTag,
  RecipeTheme,
  User,
} from "@prisma/client"

type PickedRecipe = Pick<
  Recipe,
  | "id"
  | "image"
  | "title"
  | "description"
  | "prepTime"
  | "cookTime"
  | "additionalTime"
  | "servings"
  | "public"
  | "featured"
  | "rating"
  | "reviewCount"
>

export type FullRecipe = PickedRecipe & {
  difficulty: Omit<RecipeDifficulty, "id">
  theme: Omit<RecipeTheme, "id">
  tags: Omit<RecipeTag, "id">[]
  ingredients: Omit<RecipeIngredient, "id" | "recipeId">[]
  kitchenTools: Omit<RecipeKitchenTool, "id">[]
  instructions: Omit<RecipeInstruction, "id" | "recipeId">[]
  author: User
}
