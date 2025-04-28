import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { subjectsEnumSchema } from "../../../../enums/subjects";
import { db } from "../../../../db";
import { lessonsTable } from "../../../../db/schema";

export const createLessonBodyPayloadSchema = z.object({
  title: z.string().min(3, { message: "O título da lição deve ter no mínimo 3 caracteres" }).max(140, { message: 'O título da lição deve ter no máximo 140 caracteres' }),
})

export const createLessonRoute: FastifyPluginAsyncZod = async app => {
  app.post('/subjects/:subject/lessons', {
    schema: {
      summary: 'Create a new lesson',
      operationId: 'createLesson',
      params: z.object({
        subject: subjectsEnumSchema,
      }),
      body: createLessonBodyPayloadSchema,
    },
  }, async request => {
    const { subject } = request.params;
    const { title } = request.body;
    return await db.insert(lessonsTable).values({
      title,
      subject,
    });
  })
}