import { PrismaClient } from "@prisma/client"

import { difficulties } from "./seed-data/difficulties"
import { kitchenTools } from "./seed-data/kitchen-tools"
import { ratings } from "./seed-data/ratings"
import { recipes } from "./seed-data/recipes"
import { tags } from "./seed-data/tags"
import { themes } from "./seed-data/themes"

const prisma = new PrismaClient()

async function main() {
  // Seed Recipe Difficulties
  for (let difficulty of difficulties) {
    await prisma.recipeDifficulty.create({
      data: difficulty,
    })
  }
  // Seed Recipe Themes
  for (let theme of themes) {
    await prisma.recipeTheme.create({
      data: theme,
    })
  }
  // Seed Recipe Tags
  for (let tag of tags) {
    await prisma.recipeTag.create({
      data: tag,
    })
  }
  // Seed Kitchen Tools
  for (let kitchenTool of kitchenTools) {
    await prisma.recipeKitchenTool.create({
      data: kitchenTool,
    })
  }
  // Seed Recipes
  let recipeId
  for (let recipe of recipes) {
    const createdRecipe = await prisma.recipe.create({
      data: recipe,
    })
    if (recipe.title === "The Best Chocolate Chip Cookie Recipe Ever") {
      recipeId = createdRecipe.id
    }
  }
  // Seed Ratings
  if (recipeId) {
    for (let rating of ratings(recipeId)) {
      await prisma.recipeRating.create({
        data: rating,
      })
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
