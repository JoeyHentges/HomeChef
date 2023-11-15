import { RecipeInstruction } from "@prisma/client"

interface RecipeInstructionsListProps {
  instructions: Omit<RecipeInstruction, "id" | "recipeId">[]
}

export function RecipeInstructionsList(props: RecipeInstructionsListProps) {
  const { instructions } = props

  return (
    <ul className="flex flex-col gap-y-4">
      <li className="text-base font-bold md:text-xl">Instructions</li>
      {instructions
        .sort((a, b) => a.step - b.step)
        .map((instruction) => (
          <li
            key={`recipeinstructionlist-${instruction.step}-${instruction.instruction}`}
            className="flex gap-x-2 text-sm md:text-base"
          >
            <span className="font-medium">{instruction.step + 1}.</span>
            {instruction.instruction}
          </li>
        ))}
    </ul>
  )
}
