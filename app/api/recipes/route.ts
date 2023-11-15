import { RecipeTheme } from "@prisma/client"
import { z } from "zod"

import { db } from "@/lib/db"
import { recipeThemes } from "@/utils/constants"

export type ApiGetRecipes = {
  rating: number
  reviewCount: number
  theme: RecipeTheme
  title: string
  id: string
  image: string | null
  description: string
  prepTime: number
  cookTime: number
  additionalTime: number
}[]

const routeContextSchema = z.object({
  query: z.object({
    page: z.number().default(0),
    orderBy: z.enum(["rating", "updatedAt", "reviewCount"]),
    theme: z.enum(recipeThemes).optional(),
    title: z.string().optional(),
    public: z.boolean().optional(),
    featured: z.boolean().optional(),
  }),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    let queryParams: any = {
      page: searchParams.get("page") || undefined,
      orderBy: searchParams.get("orderBy") || undefined,
      theme: searchParams.get("theme") || undefined,
      title: searchParams.get("title") || undefined,
      public: Boolean(searchParams.get("public")) || undefined,
      featured: Boolean(searchParams.get("featured")) || undefined,
    }
    // Validate the route query params.
    const { query } = routeContextSchema.parse({ query: queryParams })
    const { page, orderBy, theme, title, public: isPublic, featured } = query

    const recipes: ApiGetRecipes = await db.recipe.findMany({
      skip: page * 20,
      take: 20,
      select: {
        id: true,
        title: true,
        image: true,
        description: true,
        rating: true,
        reviewCount: true,
        prepTime: true,
        cookTime: true,
        additionalTime: true,
        theme: true,
      },
      where: {
        public: isPublic,
        featured,
        theme: {
          name: theme || undefined,
        },
        title: {
          contains: title || undefined,
          mode: "insensitive",
        },
      },
      orderBy: {
        [orderBy]: "desc",
      },
    })

    return Response.json(recipes, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
