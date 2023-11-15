import { z } from "zod"

import { db } from "@/lib/db"

export type ApiGetAggregateRecipeRating = {
  avg: number
  count: number
}

const routeContextSchema = z.object({
  query: z.object({
    recipeId: z.string(),
  }),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    let queryParams: any = {
      recipeId: searchParams.get("recipeId") || undefined,
    }
    // Validate the route query params.
    const { query } = routeContextSchema.parse({ query: queryParams })
    const { recipeId } = query

    const aggregateRecipeRating = await db.recipeRating.aggregate({
      where: {
        recipeId,
      },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    })

    if (!aggregateRecipeRating) {
      return new Response("No recipe ratings found", { status: 403 })
    }

    const response: ApiGetAggregateRecipeRating = {
      avg: aggregateRecipeRating._avg.rating || 0,
      count: aggregateRecipeRating._count.rating,
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
