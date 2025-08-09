import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { logger } from 'hono/logger'
import dbConnect from './db/connect'

const app = new Hono()

//middleware
app.use(poweredBy())
app.use(logger())

// app.use(renderer)

dbConnect()
  .then()
  .catch((err) => {
    app.get('/*', (c) => {
      return c.text(`Failed to connect mongodb ${err.message}`);
    })

})
export default app
