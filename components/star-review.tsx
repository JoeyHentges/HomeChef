"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface StarReviewProps {
  reviewCount?: number
  rating: number
  disableRating?: boolean
  onReview?: (rating: number) => void
}

export function StarReview(props: StarReviewProps) {
  const { reviewCount, rating, disableRating, onReview } = props

  const [isStarHover, setIsStarHover] = useState(false)
  const [starRating, setStarRating] = useState(rating)

  function starHover(starIndex: number, enter?: boolean) {
    if (disableRating) {
      return
    }
    if (enter) {
      setIsStarHover(true)
      setStarRating(starIndex)
      return
    }
    setIsStarHover(false)
    setStarRating(rating)
  }

  function HalfFilledStar({ index }: { index: number }) {
    return (
      <div className="flex">
        <Icons.starHalf
          key={`starreview-starright-${index}`}
          onMouseEnter={() => starHover(index, true)}
          onMouseLeave={() => starHover(index)}
          className={cn(
            "-mr-[0.495rem] w-4 fill-amber-500 md:-mr-[0.625rem] md:w-5",
            !disableRating && "cursor-pointer"
          )}
        />
        <Icons.starHalf
          key={`starreview-starleft-${index}`}
          onMouseEnter={() => starHover(index, true)}
          onMouseLeave={() => starHover(index)}
          className={cn(
            "-ml-[0.495rem] w-4 md:-ml-[0.625rem] md:w-5",
            !disableRating && "cursor-pointer"
          )}
          style={{
            transform: "scaleX(-1)",
          }}
        />
      </div>
    )
  }

  return (
    <div className="row-row flex items-center gap-2 md:gap-3">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => {
          let colorStar: boolean = false
          let halfStar: boolean = false
          if (!isStarHover) {
            if (rating !== 0) {
              if (index + 1 <= rating) {
                colorStar = true
              }
              const lastFullStar = rating - (rating % 1) - 1
              if (index === lastFullStar + 1 && rating % 1 > 0) {
                halfStar = true
              }
            }
          } else {
            if (starRating >= index) {
              colorStar = true
            }
          }

          if (halfStar) {
            return (
              <HalfFilledStar key={`starreview-star-${index}`} index={index} />
            )
          }

          return (
            <Icons.star
              key={`starreview-star-${index}`}
              onMouseEnter={() => starHover(index, true)}
              onMouseLeave={() => starHover(index)}
              onClick={() => !disableRating && onReview && onReview(index + 1)}
              className={cn(
                "w-4 transition duration-200 md:w-5",
                colorStar && "fill-amber-500",
                !disableRating && "cursor-pointer hover:scale-110"
              )}
            />
          )
        })}
      </div>
      {reviewCount !== undefined && (
        <p className="text-sm md:text-base">
          {reviewCount > 0 ? reviewCount : "No"} review
          {reviewCount !== 1 && "s"}
        </p>
      )}
    </div>
  )
}
