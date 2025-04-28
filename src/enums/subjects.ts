import { z } from "zod"

export const subjectsEnum = [
  "PHYSICS",
  "CHEMISTRY",
  "BIOLOGY",
  "MATHEMATICS",
  "COMPUTER-SCIENCE",
  "ENGLISH"
] as const

export const subjectsEnumSchema = z.enum(subjectsEnum).catch((e) => e.input)

export type SubjectsEnumType = z.infer<typeof subjectsEnumSchema>
