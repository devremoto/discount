const express = require('express');
const bodyParser = require('body-parser');
var load = require('express-load');
const expressValidator = require('express-validator');
const cors = require('cors');
const consts = require('./config');
const urlPrefix = consts.APP_URL_PREFIX;
module.exports = (function() {
  const app = express();
  const http = require('http').Server(app);

  let names = ['product', 'user'];

  app.use((req, _, next) => {
    next();
  });

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(expressValidator());
  load('routes', { cwd: 'app' }).into(app);

  app.use((_, res, next) => {
    res.status(404).send({ code: 404 });
    next();
  });

  app.use((error, _, res, next) => {
    if (process.env.NODE_ENV === 'production') {
      res.status(500).send({ code: 500 });
      return;
    }
    console.log(error);
    next(error);
  });

  app.urlPrefix = urlPrefix;

  app.start = () => {
    let port = consts.APP_PORT;
    http.listen(port, () => {
      console.clear();
      console.log(`
================================================================================================
================================================================================================

Server running on
http://localhost:${port}

GET
${names.map(x => `\ncurl http://localhost:${port}${urlPrefix}/${x}s`).join('')}

Swagger Document
http://localhost:${port}${urlPrefix}/swagger

================================================================================================
================================================================================================
`);
    });
  };

  return app;
})();
