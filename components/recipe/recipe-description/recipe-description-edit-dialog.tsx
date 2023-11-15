"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

import { recipeUserControlsEmitter } from "../recipe-user-controls/utils/recipe-user-controls-event-emitter"

const recipeDescriptionSchema = z.object({
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(250, { message: "Description cannot exceed 250 characters." }),
})

type FormData = z.infer<typeof recipeDescriptionSchema>

interface RecipeDescriptionEditDialogProps {
  enableUserControls?: boolean
  description: string
}

export function RecipeDescriptionEditDialog(
  props: RecipeDescriptionEditDialogProps
) {
  const { enableUserControls, description: initialDescription } = props
  const form = useForm<FormData>({
    resolver: zodResolver(recipeDescriptionSchema),
    defaultValues: {
      description: initialDescription,
    },
  })

  const [description, setDescription] = useState(initialDescription)

  recipeUserControlsEmitter.on("changeDescription", (value: string) => {
    setDescription(value)
  })

  function onSubmit(data: FormData) {
    recipeUserControlsEmitter.emit("changeDescription", data.description.trim())
  }

  return (
    <div
      className={cn(
        "text-center",
        enableUserControls ? "ml-4 hidden lg:block" : "hidden"
      )}
    >
      <Dialog>
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="flex max-w-[800px] items-center gap-x-2 text-center">
                  <p className="text-center text-sm italic md:text-base">
                    {description}
                  </p>
                  <Icons.pen className="h-10 w-10" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                Click to edit the recipe's description.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogTitle>Change Recipe Description</DialogTitle>
              <div className="py-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          id="description"
                          value={field.value}
                          onChange={field.onChange}
                          className="h-[100px] text-slate-700"
                        />
                      </FormControl>
                      {form.formState.errors?.description && (
                        <p className="text-xs text-red-600">
                          {form.formState.errors.description.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center">
                <DialogClose disabled={!!form.formState.errors.description}>
                  <button
                    type="submit"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" })
                    )}
                    disabled={!!form.formState.errors.description}
                  >
                    Update <Icons.save className="ml-2 h-4 w-4" />
                  </button>
                </DialogClose>
                <div className="border-r border-slate-400" />
                <DialogClose>
                  <button
                    type="button"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" })
                    )}
                    onClick={() => {
                      recipeUserControlsEmitter.emit(
                        "changeDescription",
                        initialDescription
                      )
                      form.reset()
                    }}
                  >
                    Reset <Icons.undo className="ml-2 h-4 w-4" />
                  </button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
