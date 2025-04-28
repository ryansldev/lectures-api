import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { subjectsEnumSchema } from "../../../../../../enums/subjects";
import { notesTable } from "../../../../../../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../../../../../../db";

export const getLessonNotesRoute: FastifyPluginAsyncZod = async app => {
  app.get('/subjects/:subject/lessons/:lessonId/notes', {
     schema: {
      summary: 'Get lesson notes',
      operationId: 'getLessonNotes',
      params: z.object({
        subject: subjectsEnumSchema,
        lessonId: z.coerce.number().int().positive(),
      })
    },
  }, async request => {
    const { lessonId } = request.params;
    const note = await db.select().from(notesTable).where(eq(notesTable.lessonId, lessonId)).orderBy(notesTable.createdAt);
    return note
  })
}