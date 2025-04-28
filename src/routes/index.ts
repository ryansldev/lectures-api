import { getSubjectsRoute } from "./subjects/get"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { getLessonsBySubjectRoute } from "./subjects/{subjectEnum}/lessons/get"
import { createLessonRoute } from "./subjects/{subjectEnum}/lessons/post"
import { getLessonNotesRoute } from "./subjects/{subjectEnum}/lessons/{lessonId}/notes/get"
import { createLessonNoteRoute } from "./subjects/{subjectEnum}/lessons/{lessonId}/notes/post"

export const routes: FastifyPluginAsyncZod = async app => {
  await app.register(getSubjectsRoute)
  await app.register(getLessonsBySubjectRoute)
  await app.register(createLessonRoute)
  await app.register(getLessonNotesRoute)
  await app.register(createLessonNoteRoute)
}