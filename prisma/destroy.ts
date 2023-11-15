import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Destroy Recipe Difficulties
  await prisma.recipeDifficulty.deleteMany()
  // Destroy Recipe Themes
  await prisma.recipeTheme.deleteMany()
  // Destroy Recipe Tags
  await prisma.recipeTag.deleteMany()
  // Destroy Kitchen Tools
  await prisma.recipeKitchenTool.deleteMany()
  // Destroy Ratings
  await prisma.recipeRating.deleteMany()
  // Destroy Recipes
  await prisma.recipe.deleteMany()
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
