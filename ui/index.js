const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { MemoryStore } = require('express-session');
const session = require('@lennym/redis-session');
const { assets } = require('govuk-react-components');

const views = require('express-react-views');

const auth = require('../lib/auth');
const normalise = require('../lib/settings');

module.exports = settings => {

  settings = normalise(settings);

  settings = Object.assign({
    assets: path.resolve(settings.root, './public'),
    views: path.resolve(settings.root, './views')
  }, settings);

  const app = express();
  const staticrouter = express.Router();

  app.set('trust proxy', true);
  app.set('view engine', 'jsx');
  app.set('views', settings.views);
  app.engine('jsx', views.createEngine());

  app.use(staticrouter);
  app.use(assets());

  if (settings.assets) {
    app.use('/public', express.static(settings.assets));
  }

  app.use(morgan(settings.logformat));

  if (settings.session) {
    app.use(session(settings.session));
  }
  if (settings.auth) {
    const keycloak = auth(Object.assign({ store: new MemoryStore() }, settings.auth));
    app.use(keycloak.middleware());
    app.protect = rules => app.use(keycloak.protect(rules));
  }

  app.static = staticrouter;

  return app;
};
