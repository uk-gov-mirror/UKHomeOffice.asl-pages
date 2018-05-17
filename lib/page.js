const path = require('path');
const express = require('express');
const expressViews = require('express-react-views');
const persistQuery = require('./middleware/persist-query');
const { combineReducers, createStore } = require('redux');
const allReducers = require('../lib/reducers');

module.exports = ({
  name,
  apiPath,
  reducers,
  root,
  schema
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
    res.store = createStore(combineReducers(allReducers), {
      user: {
        id: req.user.id,
        name: req.user.get('name')
      },
      list: {
        schema
      }
    });
    res.locals.store = res.store;
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
