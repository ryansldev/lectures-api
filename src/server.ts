import Fastify from 'fastify'
import { env } from './env'

const app = Fastify()

app.get('/', async () => {
  return { hello: 'world' }
})

app.listen({ port: env.port }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`HTTP Server Running!`)
})
