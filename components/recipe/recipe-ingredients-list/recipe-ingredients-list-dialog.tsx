"use client"

import { RecipeIngredient } from "@prisma/client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

import { RecipeIngredientListDialogContent } from "./recipe-ingredients-list-dialog-content"

interface RecipeIngredientListDialogProps {
  ingredients: Omit<RecipeIngredient, "id" | "recipeId">[]
}

export function RecipeIngredientsListDialog(
  props: RecipeIngredientListDialogProps
) {
  const { ingredients } = props

  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span className="flex gap-x-2">
                <p className="text-base font-bold md:text-xl">Ingredients</p>
                <Icons.pen className="mt-1 h-4 w-4" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              Click to edit the recipe's ingredients.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <RecipeIngredientListDialogContent ingredients={ingredients} />
    </Dialog>
  )
}
