'use strict';

require('dotenv-safe').load();

const express = require('express');
const path = require('path');
const next = require('next');
const routes = require('./routes');

const port = process.env.PORT;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare()
.then(() => {
  const server = express();

  server.get(/_next\/([^/]+)\/(.*?\.css)$/, (req, res) => {
    const p = path.normalize(req.params[1]);
    res.sendFile(path.join(__dirname, '.next', 'bundles', p));
  });

  server.use(handler);

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
