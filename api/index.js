const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const auth = require('../lib/auth');
const normalise = require('../lib/settings');

module.exports = settings => {
  settings = normalise(settings);
  const app = express();

  app.use(morgan(settings.logformat));

  if (settings.auth) {
    const keycloak = auth(Object.assign(settings.auth, { bearerOnly: true }));
    app.use(keycloak.middleware());
    app.protect = rules => app.use(keycloak.protect(rules));
  }

  app.use(bodyParser.json());

  return app;
};
