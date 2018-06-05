const { every } = require('lodash');
const path = require('path');
const express = require('express');
const match = require('minimatch');
const persistQuery = require('./middleware/persist-query');
const actions = require('./actions');

module.exports = ({
  name,
  reducers,
  root,
  schema,
  pageContent
}) => {
  const app = express.Router();

  const allowedSubPaths = ['/', '/assets/*', '/edit', '/delete'];

  app.use((req, res, next) => {
    if (every(allowedSubPaths, p => !match(req.path, p))) {
      return next('router');
    }
    next();
  });

  app.use('/assets', express.static(path.resolve(root, './dist')));

  app.use((req, res, next) => {
    res.locals.reducers = [ 'user', 'url', 'content', ...reducers ];
    res.store.dispatch(actions.setSchema(schema));
    next();
  });

  app.use((req, res, next) => {
    const url = req.baseUrl === '/'
      ? ''
      : req.baseUrl;
    res.store.dispatch(actions.setUrl(url));
    res.locals.scripts = ['/public/index.js', `${url}/assets/index.js`];
    next();
  });

  app.use((req, res, next) => {
    res.store.dispatch(actions.setContent(pageContent));
    next();
  });

  app.use(persistQuery());

  app.use((req, res, next) => {
    res.template = path.resolve(root, 'views/index');
    next();
  });

  return app;
};
