import { FullRecipe } from "../../recipe.types"

export function buildInitialRecipeValues(initialValues: FullRecipe) {
  const {
    id,
    image,
    title,
    description,
    prepTime,
    cookTime,
    additionalTime,
    servings,
    public: isPublic,
    featured,
    rating,
    reviewCount,
    difficulty,
    theme,
    tags,
    ingredients,
    kitchenTools,
    instructions,
    author,
  } = initialValues

  return {
    id,
    image,
    title,
    description,
    prepTime,
    cookTime,
    additionalTime,
    servings,
    public: isPublic,
    featured,
    rating,
    reviewCount,
    difficulty: {
      name: difficulty.name,
    },
    theme: {
      name: theme.name,
    },
    tags: tags.map((item) => ({
      name: item.name,
    })),
    ingredients: ingredients.map((item) => ({
      number: item.number,
      name: item.name,
      quantity: item.quantity,
      description: item.description,
    })),
    kitchenTools: kitchenTools.map((item) => ({
      category: item.category,
      name: item.name,
      provider: item.provider,
      link: item.link,
    })),
    instructions: instructions.map((item) => ({
      step: item.step,
      instruction: item.instruction,
    })),
    author,
  } as FullRecipe
}
