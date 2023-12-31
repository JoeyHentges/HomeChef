import * as z from "zod"

export const feedbackSchema = z.object({
  message: z.string().min(10),
})
