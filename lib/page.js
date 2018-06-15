const { every, merge } = require('lodash');
const { combineReducers } = require('redux');
const path = require('path');
const express = require('express');
const match = require('minimatch');
const rootReducer = require('./reducers');

const defaultMiddleware = (req, res, next) => next();

module.exports = ({
  root,
  content = {},
  locals = defaultMiddleware
}) => {
  const app = express.Router();

  const _checkSubpath = (req, res, next) => {
    const allowedSubPaths = ['/', '/assets/**', '/edit', '/edit/*', '/delete'];
    if (every(allowedSubPaths, p => !match(req.path, p))) {
      return next('router');
    }
    next();
  };

  app.use('/assets', express.static(path.resolve(root, './dist')));

  const _locals = (req, res, next) => {
    const url = req.baseUrl === '/'
      ? ''
      : req.baseUrl;
    const filename = req.path.split('/').pop() || 'index';
    const Component = require(path.resolve(root, `./views/${filename}`));

    let pageContent;

    try {
      pageContent = require(path.resolve(root, './content'));
    } catch (err) {
      pageContent = {};
    }

    Object.assign(res.locals, {
      scripts: ['/public/bundle.js', `${url}/assets/${filename}/bundle.js`],
      Component: Component.default || Component,
      rootReducer: combineReducers(rootReducer),
      static: {
        url,
        content: merge({}, res.locals.static.content, pageContent, content)
      }
    });
    res.template = path.resolve(__dirname, '../pages/common/views/index');
    return locals(req, res, next);
  };

  app.use(
    _checkSubpath,
    _locals
  );

  return app;
};
