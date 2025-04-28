import { z } from "zod"

export const envSchema = z.object({
  PORT: z.number().default(3333),
  DB_FILE_NAME: z.string().default("file:./lessons-db.sqlite"),
})

export const env = envSchema.parse(process.env)