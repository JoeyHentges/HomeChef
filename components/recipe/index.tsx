import { useMemo } from "react"
import Link from "next/link"

import { RecipeDifficulty } from "@/types/recipe"
import { getRecipePath } from "@/utils/get-recipe-url"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"
import { ApiGetRecipeRating } from "@/app/api/recipe-ratings/route"

import { RecipeDescription } from "./recipe-description"
import { RecipeEditButton } from "./recipe-edit-button"
import { RecipeImage } from "./recipe-image"
import { RecipeInfo } from "./recipe-info"
import { RecipeIngredientsList } from "./recipe-ingredients-list"
import { RecipeInstructionsList } from "./recipe-instructions-list"
import { RecipeKitchenToolList } from "./recipe-kitchen-tool-list"
import { RecipeRatings } from "./recipe-ratings"
import { RecipeTitle } from "./recipe-title"
import { RecipeUserControls } from "./recipe-user-controls"
import { FullRecipe } from "./recipe.types"

interface RecipeProps {
  enableUserControls: boolean
  showEditButton?: boolean
  recipe: FullRecipe
  disableRating: boolean
  userRating?: ApiGetRecipeRating
}

export function Recipe(props: RecipeProps) {
  const {
    enableUserControls,
    showEditButton,
    recipe,
    disableRating,
    userRating,
  } = props

  const {
    id,
    title,
    description,
    theme,
    author,
    rating,
    reviewCount,
    difficulty,
    servings,
    prepTime,
    cookTime,
    additionalTime,
    ingredients,
    kitchenTools,
    instructions,
  } = recipe
  let { image } = recipe

  const sortedIngredients = useMemo(
    () =>
      ingredients
        .sort((a, b) => a.number - b.number)
        .map((item) => ({
          number: item.number,
          name: item.name,
          quantity: item.quantity,
          description: item.description,
        })),
    []
  )
  // image =
  //  "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/9/10/0/FNK_Crispiest_Ever_Potatoes_H2_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1568385719557.jpeg"

  return (
    <>
      {enableUserControls && <RecipeUserControls recipe={recipe} />}
      {showEditButton && (
        <RecipeEditButton href={`/recipes/edit/${getRecipePath(title, id)}`} />
      )}
      <RecipeImage image={image} theme={theme.name} />
      <div className="container">
        <Link href="/" className="flex justify-center">
          <Avatar className="absolute mx-auto -mt-10 h-20 w-20 border-[3px] border-background bg-background duration-200 hover:shadow-lg md:-mt-12 md:h-24 md:w-24 md:border-[5px]">
            {author.image && <AvatarImage alt="Picture" src={author.image} />}
            <AvatarFallback className="bg-amber-200">
              <span className="sr-only">{author.name}</span>
              <Icons.user className="h-9 w-9 md:h-12 md:w-12" />
            </AvatarFallback>
          </Avatar>
        </Link>
        <p className="pt-[3.5rem] text-center text-base uppercase md:text-lg">
          Recipe by{" "}
          <Link href="/" className="duration-200 hover:text-amber-700">
            {author.name}
          </Link>
        </p>
        <RecipeTitle title={title} enableUserControls={enableUserControls} />
        <div className="pt-2 md:pt-4">
          <RecipeRatings
            recipeId={recipe.id}
            reviewCount={reviewCount}
            rating={rating}
            disableRating={disableRating}
            userRating={userRating}
          />
        </div>
        <RecipeInfo
          difficulty={difficulty?.name as RecipeDifficulty}
          prepTime={prepTime}
          cookTime={cookTime}
          additionalTime={additionalTime}
          servings={servings}
          enableUserControls={enableUserControls}
        />
        <RecipeDescription
          description={description}
          enableUserControls={enableUserControls}
        />
        <div className="mx-auto grid max-w-[850px] gap-6 pt-8 md:grid-cols-[400px_1fr] md:gap-12 md:pt-12">
          <aside className="md:w-[400px]">
            <RecipeIngredientsList
              ingredients={sortedIngredients}
              enableUserControls={enableUserControls}
            />
          </aside>
          <div className="flex w-full flex-1 flex-col gap-y-8 overflow-hidden">
            <RecipeKitchenToolList kitchenTools={kitchenTools} />
            <RecipeInstructionsList instructions={instructions} />
          </div>
        </div>
      </div>
    </>
  )
}
