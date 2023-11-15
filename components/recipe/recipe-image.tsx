"use client"

import React from "react"

import { RecipeTheme } from "@/types/recipe"
import { recipeImage } from "@/utils/recipe-image"

import { recipeUserControlsEmitter } from "./recipe-user-controls/utils/recipe-user-controls-event-emitter"

interface RecipeImageProps {
  image: string | null
  theme: string
}

export function RecipeImage(props: RecipeImageProps) {
  const { image, theme: initialTheme } = props
  const [theme, setTheme] = React.useState<string>(initialTheme)

  recipeUserControlsEmitter.on("changeTheme", (theme) => setTheme(theme))

  return (
    <div className="mx-auto flex h-[16rem] w-[100%] items-center justify-center bg-amber-200 md:mt-4 md:h-[30rem] md:max-w-[850px]">
      <img
        src={image ? image : recipeImage(theme as RecipeTheme)}
        alt={theme}
        aria-hidden
        className={
          image
            ? "inset-0 h-full w-full object-cover"
            : "max-h-[60%] w-[60%] object-contain md:max-h-[50%] md:w-[50%]"
        }
        loading="lazy"
      />
    </div>
  )
}
