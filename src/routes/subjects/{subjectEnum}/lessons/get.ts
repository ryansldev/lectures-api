import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { subjectsEnumSchema } from "../../../../enums/subjects";
import { db } from "../../../../db";
import { lessonsTable } from "../../../../db/schema";
import { eq } from "drizzle-orm";

import { lessonDto } from "../../../../types/lesson-dto";

export const getLessonsBySubjectRoute: FastifyPluginAsyncZod = async app => {
  app.get('/subjects/:subject/lessons', {
    schema: {
      summary: 'Get lessons by subject',
      operationId: 'getLessonsBySubject',
      params: z.object({
        subject: subjectsEnumSchema,
      }),
      response: {
        200: lessonDto.array(),
      },
    },
  }, async request => {
    const { subject } = request.params;
    const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.subject, subject)).orderBy(lessonsTable.createdAt);
    return lessons
  })
}