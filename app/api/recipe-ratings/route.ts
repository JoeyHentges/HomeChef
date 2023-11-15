import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export type ApiGetRecipeRating = {
  id: string
  rating: number
} | null

const getContextSchema = z.object({
  query: z.object({
    userId: z.string(),
    recipeId: z.string(),
  }),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    let queryParams: any = {
      userId: searchParams.get("userId") || undefined,
      recipeId: searchParams.get("recipeId") || undefined,
    }
    // Validate the route query params.
    const { query } = getContextSchema.parse({ query: queryParams })
    const { userId, recipeId } = query

    const recipeRating: ApiGetRecipeRating = await db.recipeRating.findFirst({
      where: {
        user: {
          id: userId,
        },
        recipe: {
          id: recipeId,
        },
      },
      select: {
        id: true,
        rating: true,
      },
    })

    return Response.json(recipeRating, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export interface ApiPostRecipeRating {
  id: string
  rating: number
}

const postBodySchema = z.object({
  recipeId: z.string(),
  rating: z.number().min(0),
})

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = postBodySchema.parse(body)

    // Update the recipeRating.
    const recipeRating = await db.recipeRating.create({
      data: {
        recipeId: payload.recipeId,
        userId: session.user.id,
        rating: payload.rating,
      },
      select: {
        id: true,
        rating: true,
      },
    })

    const aggregateRecipeRating = await db.recipeRating.aggregate({
      where: {
        recipeId: payload.recipeId,
      },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    })

    // Update the recipe's ratings tracking values
    await db.recipe.update({
      where: {
        id: payload.recipeId,
      },
      data: {
        rating: aggregateRecipeRating._avg.rating || 0,
        reviewCount: {
          increment: 1,
        },
      },
    })

    return Response.json(recipeRating, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
