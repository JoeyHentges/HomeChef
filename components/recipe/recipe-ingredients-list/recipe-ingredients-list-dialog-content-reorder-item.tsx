"use client"

import { RecipeIngredient } from "@prisma/client"
import { Reorder, useDragControls, useMotionValue } from "framer-motion"

import { Icons } from "@/components/icons"

import { useRaisedShadow } from "./use-raised-shadow"

interface RecipeIngredientListDialogContentReorderItemProps {
  ingredient: Omit<RecipeIngredient, "id" | "recipeId">
}

export function RecipeIngredientListDialogContentReorderItem(
  props: RecipeIngredientListDialogContentReorderItemProps
) {
  const { ingredient } = props
  const dragControls = useDragControls()
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)

  return (
    <Reorder.Item
      value={ingredient}
      id={JSON.stringify(ingredient)}
      dragListener={false}
      dragControls={dragControls}
      style={{ boxShadow, y }}
      className="flex select-none justify-between bg-slate-300 py-2"
    >
      {ingredient.name}
      <Icons.grip
        className="cursor-grab"
        onPointerDown={(e) => dragControls.start(e)}
      />
    </Reorder.Item>
  )
}
