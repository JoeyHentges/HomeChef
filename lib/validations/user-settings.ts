import * as z from "zod"

export const userSettingsSchema = z.object({
  name: z.string().min(3).max(32),
  receiveMarketingEmails: z.boolean(),
  receiveSecurityEmails: z.boolean(),
})
