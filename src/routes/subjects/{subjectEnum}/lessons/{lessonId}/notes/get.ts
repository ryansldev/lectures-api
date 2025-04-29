import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { subjectsEnumSchema } from "../../../../../../enums/subjects";
import { notesTable } from "../../../../../../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../../../../../../db";

import { noteDto } from "../../../../../../types/note-dto";

export const getLessonNotesRoute: FastifyPluginAsyncZod = async app => {
  app.get('/subjects/:subject/lessons/:lessonId/notes', {
     schema: {
      summary: 'Get lesson notes',
      operationId: 'getLessonNotes',
      params: z.object({
        subject: subjectsEnumSchema,
        lessonId: z.coerce.number().int().positive(),
      }),
      response: {
        200: noteDto.array(),
      }
    },
  }, async request => {
    const { lessonId } = request.params;
    const notes = await db.select().from(notesTable).where(eq(notesTable.lessonId, lessonId)).orderBy(notesTable.createdAt);
    return notes
  })
}