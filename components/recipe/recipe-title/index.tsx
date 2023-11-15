import { cn } from "@/lib/utils"

import { RecipeTitleEditDialog } from "./recipe-title-edit-dialog"

interface RecipeTitleProps {
  title: string
  enableUserControls?: boolean
}

export function RecipeTitle(props: RecipeTitleProps) {
  const { title, enableUserControls } = props

  return (
    <div className="pt-2">
      <RecipeTitleEditDialog
        enableUserControls={enableUserControls}
        title={title}
      />
      <p
        className={cn(
          "text-center text-2xl font-bold md:text-3xl",
          enableUserControls ? "block lg:hidden" : "block"
        )}
      >
        {title}
      </p>
    </div>
  )
}
