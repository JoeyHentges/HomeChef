"use client"

import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { getRecipePath } from "@/utils/get-recipe-url"
import { buttonVariants } from "@/components/ui/button"

import { useRecipe } from "./utils/recipe-context"

export function RecipeUserControlsButtons() {
  const { recipe, recipeChanged } = useRecipe()

  if (!recipeChanged) {
    return (
      <div className="flex gap-x-2">
        <Link
          className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          href={`/recipes/${getRecipePath(
            recipe?.title || "",
            recipe?.id || ""
          )}`}
        >
          Quit
        </Link>
        <button
          className={cn(buttonVariants({ variant: "destructive", size: "sm" }))}
          onClick={() => console.log("delete", recipe)}
        >
          Delete
        </button>
      </div>
    )
  }

  return (
    <div className="flex gap-x-2">
      <button
        className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        onClick={() => window.location.reload()}
      >
        Reset
      </button>
      <button
        className={cn(buttonVariants({ variant: "success", size: "sm" }))}
        onClick={() => console.log("save", recipe)}
      >
        Save
      </button>
      <button
        className={cn(buttonVariants({ variant: "destructive", size: "sm" }))}
        onClick={() => console.log("delete", recipe)}
      >
        Delete
      </button>
    </div>
  )
}
