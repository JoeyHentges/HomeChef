import Link from "next/link"

import { RecipeTheme } from "@/types/recipe"
import { cn } from "@/lib/utils"
import { minutesToHrsMins } from "@/utils/minutes-to-hrs-mins"
import { recipeImage } from "@/utils/recipe-image"
import { Icons } from "@/components/icons"

export interface RecipeSearchItemProps {
  href: string
  image: string | null
  title: string
  description: string
  rating: number
  reviewCount: number
  cookTime: number
  theme: RecipeTheme
}

export function RecipeSearchItem(props: RecipeSearchItemProps) {
  const {
    href,
    image,
    title,
    description,
    rating,
    reviewCount,
    cookTime,
    theme,
  } = props

  const descriptionLength = description?.length
  const maxLengthDescription = `${description?.substring(0, 150)}${
    descriptionLength && descriptionLength > 150 && "..."
  }`

  function HalfFilledStar({ index }: { index: number }) {
    return (
      <div className="flex">
        <Icons.starHalf
          key={`starreview-star-${index}`}
          className="-mr-[0.495rem] w-4 fill-amber-500"
        />
        <Icons.starHalf
          key={`starreview-star-${index}`}
          className="-ml-[0.495rem] w-4"
          style={{
            transform: "scaleX(-1)",
          }}
        />
      </div>
    )
  }

  return (
    <Link href={href} aria-label={title}>
      <div className="group flex flex-col transition hover:shadow-lg md:flex-row lg:hover:!opacity-100 lg:group-hover/list:opacity-90">
        <div className="relative h-40 w-[100%] flex-none rounded-tl-lg rounded-tr-lg bg-amber-200 md:h-auto md:w-60 md:rounded-bl-lg md:rounded-tl-lg md:rounded-tr-none">
          <img
            src={image ? image : recipeImage(theme)}
            alt={title}
            aria-hidden
            className={cn(
              "inset-0 h-full w-full rounded-tl-lg rounded-tr-lg md:absolute md:rounded-bl-lg md:rounded-tl-lg md:rounded-tr-none",
              image ? "object-cover" : "mx-auto w-[70%] object-contain"
            )}
            loading="lazy"
          />
        </div>
        <div className="flex w-[100%] flex-col bg-white px-6 py-4 md:rounded-r-lg xl:min-h-[250px]">
          <div className="my-auto">
            <h1 className="flex-auto text-lg font-bold transition group-hover:text-amber-700 sm:text-2xl">
              {title}
            </h1>
            <p className="display-[-webkit-box] overflow-hidden pt-3 text-sm">
              {maxLengthDescription}
            </p>
            <div className="grid grid-cols-2 gap-x-4 pt-3">
              <div className="flex flex-col items-center border-r border-slate-300 md:items-start">
                <p className="text-sm">Rating</p>
                {reviewCount > 0 ? (
                  <div className="row-row flex items-center gap-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => {
                        let colorStar: boolean = false
                        let halfStar: boolean = false
                        if (rating !== 0) {
                          if (index + 1 <= rating) {
                            colorStar = true
                          }
                          const lastFullStar = rating - (rating % 1) - 1
                          if (index === lastFullStar + 1 && rating % 1 > 0) {
                            halfStar = true
                          }
                        }

                        if (halfStar) {
                          return (
                            <HalfFilledStar
                              key={`recipesearchitem-star-${index}`}
                              index={index}
                            />
                          )
                        }

                        return (
                          <Icons.star
                            key={`recipesearchitem-star-${index}`}
                            className={cn(
                              "w-4 transition duration-200",
                              colorStar && "fill-amber-500"
                            )}
                          />
                        )
                      })}
                    </div>
                    <p className="mt-[0.2em] text-[0.8em]">({reviewCount})</p>
                  </div>
                ) : (
                  <div className="mt-[0.2em]">
                    <p className="text-[0.8em]">No reviews</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center md:items-start">
                <p className="text-sm">Cook Time</p>
                <p className="text-base font-bold">
                  {minutesToHrsMins(cookTime)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
