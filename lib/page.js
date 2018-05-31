const { merge } = require('lodash');
const path = require('path');
const express = require('express');
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

  app.use('/assets', express.static(path.resolve(root, './dist')));

  app.get('/', (req, res, next) => {
    res.locals.reducers = [ 'user', 'url', 'content', ...reducers ];
    res.store.dispatch(actions.setSchema(schema));
    next();
  });

  app.get('/', (req, res, next) => {
    const url = req.baseUrl === '/'
      ? ''
      : req.baseUrl;
    res.store.dispatch(actions.setUrl(url));
    res.locals.scripts = ['/public/index.js', `${url}/assets/index.js`];
    next();
  });

  app.get('/', (req, res, next) => {
    const content = merge({}, req.appContent, pageContent);
    res.store.dispatch(actions.setContent(content));
    next();
  });

  app.get('/', persistQuery());

  app.get('/', (req, res, next) => {
    res.template = path.resolve(root, 'views/index');
    next();
  });

  return app;
};
