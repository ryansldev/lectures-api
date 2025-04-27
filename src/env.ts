import { z } from "zod"

export const envSchema = z.object({
  port: z.number().default(3333),
})

export const env = envSchema.parse(process.env)