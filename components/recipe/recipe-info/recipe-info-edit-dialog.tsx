import { RecipeDifficulty } from "@/types/recipe"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

import { RecipeInfoEditDialogContent } from "./recipe-info-edit-dialog-content"

interface RecipeInfoEditDialogProps {
  difficulty: RecipeDifficulty
  prepTime: number
  cookTime: number
  additionalTime: number
  servings: number
}

export function RecipeInfoEditDialog(props: RecipeInfoEditDialogProps) {
  const { difficulty, prepTime, cookTime, additionalTime, servings } = props

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <p className="ml-4 flex items-center gap-x-2 text-lg italic">
                  Edit Info
                  <Icons.pen className="h-4 w-4" />
                </p>
              </TooltipTrigger>
              <TooltipContent>
                Click to edit the difficulty, time, and servings.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <RecipeInfoEditDialogContent
          difficulty={difficulty}
          prepTime={prepTime}
          cookTime={cookTime}
          additionalTime={additionalTime}
          servings={servings}
        />
      </Dialog>
    </div>
  )
}
