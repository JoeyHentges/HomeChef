import {
  RecipeDifficulty,
  RecipeIngredient,
  RecipeInstruction,
  RecipeKitchenTool,
  RecipeTag,
  RecipeTheme,
  User,
} from "@prisma/client"
import { z } from "zod"

import { db } from "@/lib/db"

export type ApiGetRecipe = {
  id: string
  image: string | null
  title: string
  description: string
  author: User
  theme: RecipeTheme
  rating: number
  reviewCount: number
  prepTime: number
  cookTime: number
  additionalTime: number
  servings: number
  difficulty: RecipeDifficulty
  instructions: RecipeInstruction[]
  ingredients: RecipeIngredient[]
  kitchenTools: RecipeKitchenTool[]
  tags: RecipeTag[]
  public: boolean
  featured: boolean
} | null

const getContextSchema = z.object({
  params: z.object({
    recipeId: z.string(),
  }),
})

export async function GET(
  _: Request,
  context: z.infer<typeof getContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = getContextSchema.parse(context)

    // Update the user.
    const recipe = await db.recipe.findFirst({
      where: {
        id: params.recipeId,
      },
      select: {
        id: true,
        image: true,
        title: true,
        description: true,
        author: true,
        theme: true,
        rating: true,
        reviewCount: true,
        prepTime: true,
        cookTime: true,
        additionalTime: true,
        servings: true,
        difficulty: true,
        instructions: true,
        ingredients: true,
        kitchenTools: true,
        tags: true,
        public: true,
        featured: true,
      },
    })

    return Response.json(recipe, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
