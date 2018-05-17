const path = require('path');
const express = require('express');
const expressViews = require('express-react-views');
const persistQuery = require('./middleware/persist-query');

module.exports = ({
  name,
  apiPath,
  reducers,
  root
}) => {
  const app = express();

  app.set('view engine', 'jsx');
  app.engine('jsx', expressViews.createEngine({
    transformViews: false
  }));

  app.use('/assets', express.static(path.resolve(root, './dist')));

  app.get('/', (req, res, next) => {
    res.locals.reducers = [ 'user', 'url', ...reducers ];
    next();
  });

  app.get('/', (req, res, next) => {
    const url = req.baseUrl === '/'
      ? ''
      : req.baseUrl;
    res.locals.url = url;
    next();
  });

  app.get('/', persistQuery());

  app.get('/', (req, res, next) => {
    res.template = path.resolve(root, 'views/index');
    next();
  });

  return app;
};
