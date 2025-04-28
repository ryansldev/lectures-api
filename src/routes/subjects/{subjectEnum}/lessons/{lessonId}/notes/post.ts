import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { subjectsEnumSchema } from "../../../../../../enums/subjects";
import { lessonsTable, notesTable } from "../../../../../../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../../../../../../db";

const createLessonNoteBodyPayloadSchema = z.object({
  content: z.string(),
})

export const createLessonNoteRoute: FastifyPluginAsyncZod = async app => {
  app.post('/subjects/:subject/lessons/:lessonId/notes', {
     schema: {
      summary: 'Create lesson note',
      operationId: 'createLessonNote',
      params: z.object({
        subject: subjectsEnumSchema,
        lessonId: z.coerce.number().int().positive(),
      }),
      body: createLessonNoteBodyPayloadSchema,
    },
  }, async request => {
    const { lessonId } = request.params;
    const { content } = request.body;

    await db.insert(notesTable).values({
      content,
      type: 'TEXT',
      lessonId,
    });
  })
}