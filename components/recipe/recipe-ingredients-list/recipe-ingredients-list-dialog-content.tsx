import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { RecipeIngredient } from "@prisma/client"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Icons } from "@/components/icons"

import { recipeUserControlsEmitter } from "../recipe-user-controls/utils/recipe-user-controls-event-emitter"
import { RecipeIngredientListDialogContentReorderItem } from "./recipe-ingredients-list-dialog-content-reorder-item"

const recipeIngredientsListSchema = z.object({
  ingredients: z
    .object({
      number: z.coerce.number().int().gte(0).lte(99),
      name: z.string().min(3).max(100),
      quantity: z.string().min(1).max(100),
      description: z.string().min(3).max(100).nullable(),
    })
    .array(),
})

type FormData = z.infer<typeof recipeIngredientsListSchema>

interface RecipeIngredientListDialogContentProps {
  ingredients: Omit<RecipeIngredient, "id" | "recipeId">[]
}

export function RecipeIngredientListDialogContent(
  props: RecipeIngredientListDialogContentProps
) {
  const { ingredients: initialIngredients } = props
  const form = useForm<FormData>({
    resolver: zodResolver(recipeIngredientsListSchema),
    defaultValues: {
      ingredients: initialIngredients,
    },
  })

  const [ingredients, setIngredients] = useState(initialIngredients)

  function onSubmit(data: FormData) {
    // recipeUserControlsEmitter.emit("changeIngredients", data.ingredients)
  }

  function onRevert() {
    recipeUserControlsEmitter.emit("changeIngredients", initialIngredients)
    setIngredients(initialIngredients)
    form.reset()
  }

  const formHasErrors = () => {
    if (!!form.formState.errors.ingredients) return true
    return false
  }

  // misc stuff

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const quotes = reorder(
      ingredients,
      result.source.index,
      result.destination.index
    )

    setIngredients(quotes)
  }

  // end misc stuff

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogTitle>Change The Ingredients</DialogTitle>

          <div className="py-8">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {ingredients.map((item, index) => (
                      <Draggable
                        key={item.number}
                        draggableId={index.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <div className="flex justify-center">
            <DialogClose disabled={formHasErrors()}>
              <button
                type="submit"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                disabled={formHasErrors()}
              >
                Update <Icons.save className="ml-2 h-4 w-4" />
              </button>
            </DialogClose>
            <div className="border-r border-slate-400" />
            <DialogClose>
              <button
                type="button"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                onClick={onRevert}
              >
                Reset <Icons.undo className="ml-2 h-4 w-4" />
              </button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}

// a little function to help us with reordering the result
const reorder = (
  list: Omit<RecipeIngredient, "id" | "recipeId">[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 8

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
})
