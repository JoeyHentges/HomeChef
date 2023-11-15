export const ratings = (recipeId: string) => [
  {
    user: {
      connect: { email: "email@gmail.com" },
    },
    recipe: {
      connect: { id: recipeId },
    },
    rating: 4,
  },
  {
    user: {
      connect: { email: "email@gmail.com" },
    },
    recipe: {
      connect: { id: recipeId },
    },
    rating: 3,
  },
  {
    user: {
      connect: { email: "email@gmail.com" },
    },
    recipe: {
      connect: { id: recipeId },
    },
    rating: 5,
  },
  {
    user: {
      connect: { email: "email@gmail.com" },
    },
    recipe: {
      connect: { id: recipeId },
    },
    rating: 5,
  },
]
