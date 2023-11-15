import { RecipeKitchenTool } from "@prisma/client"

import { Icons } from "@/components/icons"

interface RecipeKitchenToolListProps {
  kitchenTools: Omit<RecipeKitchenTool, "id">[]
}

export function RecipeKitchenToolList(props: RecipeKitchenToolListProps) {
  const { kitchenTools } = props

  return (
    <ul className="flex flex-col gap-y-4 md:gap-y-2">
      <li className="text-base font-bold md:text-xl">Kitchen Tools</li>
      {kitchenTools.map((kitchenTool) => (
        <li
          key={`recipekitchentool-${kitchenTool.category}`}
          className="flex gap-x-2 text-sm md:text-base"
        >
          <a
            href={kitchenTool.link}
            target="_blank"
            rel="noreferrer"
            className="flex w-min items-center gap-x-2 whitespace-nowrap text-sm duration-150 hover:text-amber-700 md:text-base"
          >
            <Icons.link className="h-3 w-3" />
            {kitchenTool.category}
          </a>
        </li>
      ))}
    </ul>
  )
}
