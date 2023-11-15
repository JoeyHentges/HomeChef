"use client"

import { useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { RecipeDifficulty } from "@/types/recipe"
import { cn } from "@/lib/utils"
import { recipeDifficulties } from "@/utils/constants"
import { minutesToHrsMins } from "@/utils/minutes-to-hrs-mins"
import { buttonVariants } from "@/components/ui/button"
import { DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"

import { recipeUserControlsEmitter } from "../recipe-user-controls/utils/recipe-user-controls-event-emitter"

const recipeInfoSchema = z.object({
  difficulty: z.enum(recipeDifficulties),
  prepTime: z.number().min(0).max(10080),
  cookTime: z.number().min(0).max(10080),
  additionalTime: z.number().min(0).max(10080),
  servings: z.number().min(1).max(500),
})

type FormData = z.infer<typeof recipeInfoSchema>

interface RecipeInfoEditDialogContentProps {
  difficulty: RecipeDifficulty
  prepTime: number
  cookTime: number
  additionalTime: number
  servings: number
}

export function RecipeInfoEditDialogContent(
  props: RecipeInfoEditDialogContentProps
) {
  const { difficulty, prepTime, cookTime, additionalTime, servings } = props
  const form = useForm<FormData>({
    resolver: zodResolver(recipeInfoSchema),
    defaultValues: {
      difficulty: difficulty,
      prepTime: prepTime,
      cookTime: cookTime,
      additionalTime: additionalTime,
      servings: servings,
    },
  })

  function onSubmit(data: FormData) {
    recipeUserControlsEmitter.emit("changeInfo", {
      difficulty: data.difficulty,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      additionalTime: data.additionalTime,
      servings,
    })
  }

  function onRevert() {
    recipeUserControlsEmitter.emit("changeInfo", {
      difficulty,
      prepTime,
      cookTime,
      additionalTime,
      servings,
    })
    form.reset()
  }

  const formHasErrors = () => {
    if (!!form.formState.errors.difficulty) return true
    if (!!form.formState.errors.prepTime) return true
    if (!!form.formState.errors.cookTime) return true
    if (!!form.formState.errors.additionalTime) return true
    if (!!form.formState.errors.servings) return true
    return false
  }

  return (
    <DialogContent className="max-w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogTitle>Change The Numbers</DialogTitle>
          <div className="flex flex-col gap-y-4 py-4">
            <div className="flex items-center justify-between">
              <p>Difficulty</p>
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[125px] capitalize">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {recipeDifficulties.map((item) => {
                            return (
                              <SelectItem
                                key={`recipeinfoeditdialogcontent-difficulty-${item}`}
                                value={item}
                                className="capitalize"
                              >
                                {item}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {form.formState.errors?.difficulty && (
                      <p className="text-xs text-red-600">
                        {form.formState.errors.difficulty.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between space-y-1">
                <p className="pb-1">
                  Prep Time{" "}
                  <span className="text-sm italic text-gray-500">
                    (minutes)
                  </span>
                </p>
                <FormField
                  control={form.control}
                  name="prepTime"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="prepTime"
                          {...form.register("prepTime", {
                            valueAsNumber: true,
                          })}
                          className="w-[125px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {form.formState.errors?.prepTime && (
                <p className="text-xs text-red-600">
                  {form.formState.errors.prepTime.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between space-y-1">
                <p className="pb-1">
                  Cook Time{" "}
                  <span className="text-sm italic text-gray-500">
                    (minutes)
                  </span>
                </p>
                <FormField
                  control={form.control}
                  name="cookTime"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="cookTime"
                          {...form.register("cookTime", {
                            valueAsNumber: true,
                          })}
                          className="w-[125px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {form.formState.errors?.cookTime && (
                <p className="text-xs text-red-600">
                  {form.formState.errors.cookTime.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between space-y-1">
                <p className="pb-1">
                  Additional Time{" "}
                  <span className="text-sm italic text-gray-500">
                    (minutes)
                  </span>
                </p>
                <FormField
                  control={form.control}
                  name="additionalTime"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="additionalTime"
                          {...form.register("additionalTime", {
                            valueAsNumber: true,
                          })}
                          className="w-[125px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {form.formState.errors?.additionalTime && (
                <p className="text-xs text-red-600">
                  {form.formState.errors.additionalTime.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between space-y-1">
                <p className="pb-1">Servings</p>
                <FormField
                  control={form.control}
                  name="servings"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="servings"
                          {...form.register("servings", {
                            valueAsNumber: true,
                          })}
                          className="w-[125px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {form.formState.errors?.servings && (
                <p className="text-xs text-red-600">
                  {form.formState.errors.servings.message}
                </p>
              )}
            </div>
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
