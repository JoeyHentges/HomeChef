import { RecipeDifficulty } from "@/types/recipe"

type Difficuly = {
  name: RecipeDifficulty
}

export const difficulties: Difficuly[] = [
  { name: "beginner" },
  { name: "easy" },
  { name: "moderate" },
  { name: "hard" },
  { name: "expert" },
]
