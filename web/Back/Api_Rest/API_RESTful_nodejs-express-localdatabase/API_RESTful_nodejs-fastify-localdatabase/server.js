import { fastify } from 'fastify'
const app = fastify()

import { DataBsememory } from './src/models/DataBasememory.js'

// app.use(fastify.json())
app.get('/', () => {
    return 'Hello'
})


app.listen({
    port: 3333
})