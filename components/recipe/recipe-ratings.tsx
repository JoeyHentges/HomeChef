"use client"

import { useState } from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { StarReview } from "@/components/star-review"
import { ApiPutRecipeRating } from "@/app/api/recipe-ratings/[recipeRatingId]/route"
import { ApiGetAggregateRecipeRating } from "@/app/api/recipe-ratings/aggregate/route"
import { ApiGetRecipeRating } from "@/app/api/recipe-ratings/route"

interface RecipeRatingsProps {
  recipeId: string
  rating: number
  reviewCount: number
  disableRating: boolean
  userRating?: ApiGetRecipeRating
}

export function RecipeRatings(props: RecipeRatingsProps) {
  const {
    recipeId,
    rating,
    reviewCount,
    disableRating,
    userRating: userRate,
  } = props

  const [userRating, setUserRating] = useState<ApiGetRecipeRating | undefined>(
    userRate
  )
  const [recipeRating, setRecipeRating] = useState<ApiGetAggregateRecipeRating>(
    {
      avg: rating,
      count: reviewCount,
    }
  )

  async function fetchRecipeRating() {
    const response = await fetch(
      `/api/recipe-ratings/aggregate?recipeId=${recipeId}`
    )
    const json: ApiGetAggregateRecipeRating = await response.json()
    setRecipeRating(json)
  }

  async function onReview(rating: number) {
    // Pre-set the userRating and recipeRating so that it displays instantly
    // re-set them after the two api calls are complete
    setUserRating({
      id: userRating?.id || "",
      rating,
    })

    let response
    if (userRating) {
      // updating existing rating
      setRecipeRating({
        avg:
          (recipeRating.avg - userRating.rating + rating) / recipeRating.count,
        count: recipeRating.count,
      })
      response = await fetch(`/api/recipe-ratings/${userRating?.id}`, {
        method: "PUT",
        body: JSON.stringify({
          rating,
        }),
      })
    } else {
      // adding a new rating
      setRecipeRating({
        avg: (recipeRating.avg + rating) / (recipeRating.count + 1),
        count: recipeRating.count + 1,
      })
      response = await fetch(`/api/recipe-ratings`, {
        method: "POST",
        body: JSON.stringify({
          recipeId,
          rating,
        }),
      })
    }
    const json: ApiPutRecipeRating = await response.json()
    await fetchRecipeRating()
    setUserRating(json)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger className="cursor-default">
            <StarReview
              reviewCount={recipeRating.count}
              rating={recipeRating.avg}
              disableRating={disableRating}
              onReview={onReview}
            />
          </TooltipTrigger>
          <TooltipContent>
            {reviewCount > 0 ? `${recipeRating.avg} of 5 stars` : "No reviews"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {userRating && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-default grayscale">
              <StarReview rating={userRating.rating} disableRating />
            </TooltipTrigger>
            <TooltipContent>Your rating</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
