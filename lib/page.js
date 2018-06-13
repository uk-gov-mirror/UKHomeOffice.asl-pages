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

  const allowedSubPaths = ['/', '/assets/**', '/edit', '/edit/*', '/delete'];

  app.use((req, res, next) => {
    if (every(allowedSubPaths, p => !match(req.path, p))) {
      return next('router');
    }
    next();
  });

  app.use('/assets', express.static(path.resolve(root, './dist')));

  app.use((req, res, next) => {
    res.locals.reducers = [ 'user', 'url', 'content', ...reducers ];
    if (schema) {
      res.store.dispatch(actions.setSchema(schema));
    }
    next();
  });

  app.use((req, res, next) => {
    const filename = req.path.split('/').pop() || 'index';
    const url = req.baseUrl === '/'
      ? ''
      : req.baseUrl;
    res.store.dispatch(actions.setUrl(url));
    res.locals.scripts = ['/public/bundle.js', `${url}/assets/${filename}/bundle.js`];

    res.template = path.resolve(root, `views/${filename}`);
    next();
  });

  app.use((req, res, next) => {
    res.store.dispatch(actions.setContent(pageContent));
    next();
  });

  app.use(persistQuery());

  return app;
};
