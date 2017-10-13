'use strict'

require('./env')

const express = require('express')
const path = require('path')
const next = require('next')
const routes = require('./routes')

const port = process.env.PORT
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare()
.then(() => {
  const server = express()

  server.get(/(\/node_modules\/.*?\.(:?woff2?|ttf|eot|svg))$/, (req, res) => {
    const p = path.normalize(req.params[0])
    res.sendFile(path.join(__dirname, p))
  })

  server.use(handler)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  })
})
