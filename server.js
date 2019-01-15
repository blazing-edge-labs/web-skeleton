'use strict'

require('dotenv-safe').load()

const express = require('express')
const cookiesMiddleware = require('universal-cookie-express')
const Next = require('next')
const routes = require('./routes')

const port = process.env.PORT
const dev = process.env.NODE_ENV !== 'production'

const app = Next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare()
  .then(() => {
    const server = express()

    server.use(cookiesMiddleware())

    server.use(handler)

    server.listen(port, (err) => {
      if (err) throw err
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
    })
  })
