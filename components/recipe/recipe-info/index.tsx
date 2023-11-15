"use client"

import { useState } from "react"

import { RecipeDifficulty } from "@/types/recipe"
import { cn } from "@/lib/utils"
import { minutesToHrsMins } from "@/utils/minutes-to-hrs-mins"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { recipeUserControlsEmitter } from "../recipe-user-controls/utils/recipe-user-controls-event-emitter"
import { RecipeInfoEditDialog } from "./recipe-info-edit-dialog"

export interface RecipeInfoProps {
  difficulty: RecipeDifficulty
  prepTime: number
  cookTime: number
  additionalTime: number
  servings: number
  enableUserControls?: boolean
}

export function RecipeInfo(props: RecipeInfoProps) {
  const {
    difficulty: initialDifficulty,
    prepTime: initialPrepTime,
    cookTime: initialCookTime,
    additionalTime: initialAdditionalTime,
    servings: initialServings,
    enableUserControls,
  } = props

  const [difficulty, setDifficulty] =
    useState<RecipeDifficulty>(initialDifficulty)
  const [prepTime, setPrepTime] = useState<number>(initialPrepTime)
  const [cookTime, setCookTime] = useState<number>(initialCookTime)
  const [additionalTime, setAdditionalTime] = useState<number>(
    initialAdditionalTime
  )
  const [servings, setServings] = useState<number>(initialServings)

  recipeUserControlsEmitter.on("changeInfo", (recipeInfo) => {
    const { difficulty, prepTime, cookTime, additionalTime, servings } =
      recipeInfo
    setDifficulty(difficulty)
    setPrepTime(prepTime)
    setCookTime(cookTime)
    setAdditionalTime(additionalTime)
    setServings(servings)
  })

  return (
    <div className="mx-auto w-[100%] pt-6 md:max-w-[600px]">
      <div className="flex justify-between text-base md:text-lg">
        <div className="w-[100%] text-center">
          <p>Difficulty</p>
          <p className="font-bold capitalize">{difficulty}</p>
        </div>
        <div className="w-[100%] text-center">
          <p>Time</p>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <p className="font-bold">
                  {minutesToHrsMins(prepTime + cookTime + additionalTime)}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>Prep time: {minutesToHrsMins(prepTime)}</p>
                <p>Cook time: {minutesToHrsMins(cookTime)}</p>
                <p>Additional time: {minutesToHrsMins(additionalTime)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="w-[100%] text-center">
          <p>Servings</p>
          <p className="font-bold">{servings}</p>
        </div>
      </div>
      <div
        className={cn(
          "pt-2",
          enableUserControls ? "hidden lg:block" : "hidden"
        )}
      >
        <RecipeInfoEditDialog
          difficulty={initialDifficulty}
          prepTime={initialPrepTime}
          cookTime={initialCookTime}
          additionalTime={initialAdditionalTime}
          servings={initialServings}
        />
      </div>
    </div>
  )
}
