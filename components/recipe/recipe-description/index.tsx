import { cn } from "@/lib/utils"

import { RecipeDescriptionEditDialog } from "./recipe-description-edit-dialog"

interface RecipeDescriptionProps {
  description: string
  enableUserControls?: boolean
}

export function RecipeDescription(props: RecipeDescriptionProps) {
  const { description, enableUserControls } = props

  return (
    <div className="pt-8">
      <RecipeDescriptionEditDialog
        enableUserControls={enableUserControls}
        description={description}
      />
      <p
        className={cn(
          "mx-auto text-center text-sm italic md:text-base w-[100%] md:max-w-[800px]",
          enableUserControls ? "block lg:hidden" : "block"
        )}
      >
        {description}
      </p>
    </div>
  )
}
