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
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

import { recipeUserControlsEmitter } from "../recipe-user-controls/utils/recipe-user-controls-event-emitter"

const recipeTitleSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(45, { message: "Title cannot exceed 45 characters." }),
})

type FormData = z.infer<typeof recipeTitleSchema>

interface RecipeTitleEditDialogProps {
  enableUserControls?: boolean
  title: string
}

export function RecipeTitleEditDialog(props: RecipeTitleEditDialogProps) {
  const { enableUserControls, title: initialTitle } = props
  const form = useForm<FormData>({
    resolver: zodResolver(recipeTitleSchema),
    defaultValues: {
      title: initialTitle,
    },
  })

  const [title, setTitle] = useState(initialTitle)

  recipeUserControlsEmitter.on("changeTitle", (value: string) => {
    setTitle(value)
  })

  function onSubmit(data: FormData) {
    recipeUserControlsEmitter.emit("changeTitle", data.title.trim())
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
                <span className="flex items-center gap-x-2">
                  <p className="text-2xl font-bold md:text-3xl">{title}</p>
                  <Icons.pen className="mt-1 h-5 w-5" />
                </span>
              </TooltipTrigger>
              <TooltipContent>Click to edit the recipe's title.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogTitle>Change Recipe Title</DialogTitle>
              <div className="py-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="title"
                          size={32}
                          value={field.value}
                          onChange={field.onChange}
                          className="text-slate-700"
                        />
                      </FormControl>
                      {form.formState.errors?.title && (
                        <p className="text-xs text-red-600">
                          {form.formState.errors.title.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center">
                <DialogClose disabled={!!form.formState.errors.title}>
                  <button
                    type="submit"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" })
                    )}
                    disabled={!!form.formState.errors.title}
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
                        "changeTitle",
                        initialTitle
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
