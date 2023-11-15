import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export interface ApiPutRecipeRating {
  id: string
  rating: number
}

const putContextSchema = z.object({
  params: z.object({
    recipeRatingId: z.string(),
  }),
})

const putBodySchema = z.object({
  rating: z.number().min(0),
})

export async function PUT(
  req: Request,
  context: z.infer<typeof putContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = putContextSchema.parse(context)

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = putBodySchema.parse(body)

    // Update the recipeRating.
    const recipeRating = await db.recipeRating.update({
      where: {
        id: params.recipeRatingId,
      },
      data: {
        rating: payload.rating,
      },
      select: {
        id: true,
        rating: true,
        recipeId: true,
      },
    })

    const aggregateRecipeRating = await db.recipeRating.aggregate({
      where: {
        recipeId: recipeRating.recipeId,
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
        id: recipeRating.recipeId,
      },
      data: {
        rating: aggregateRecipeRating._avg.rating || 0,
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
