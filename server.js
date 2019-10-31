// This file is automatically picked up by the express server and registers the route to handle.
const nextjs = require('next')
const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = nextjs({ dev })
const handler = routes.getRequestHandler(app)

const express = require('express')

app.prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => {
      return handler(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    });
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })