import { z } from "zod";
import { subjectsEnumSchema } from "../enums/subjects";

export const lessonDto = z.object({
  id: z.number(),
  subject: subjectsEnumSchema,
  title: z.string(),
  createdAt: z.string().datetime().nullable(),
})

export type LessonDto = z.infer<typeof lessonDto>