import Fastify from 'fastify'
import { env } from './env'
import { routes } from './routes'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

const app = Fastify()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Lectures',
      version: '0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.get('/', async () => {
  return { hello: 'world' }
})

app.register(routes)

app.listen({ port: env.PORT }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`HTTP Server Running!`)
})
