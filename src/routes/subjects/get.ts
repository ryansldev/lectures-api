import { subjectsEnum as subjects, subjectsEnumSchema } from "../../enums/subjects"
import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const getSubjectsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/subjects', {
    schema: {
      summary: 'Get all subjects',
      operationId: 'getSubjects',
      response: {
        200: z.object({
          subjects: subjectsEnumSchema,
        })
      }
    },
  }, () => {
    return { subjects };
  })
}