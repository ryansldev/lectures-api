import { z } from "zod";

export const noteDto = z.object({
  id: z.number(),
  type: z.enum(['TEXT']),
  content: z.string(),
  createdAt: z.string().datetime().nullable(),
  lessonId: z.number(),
})

export type NoteDto = z.infer<typeof noteDto>