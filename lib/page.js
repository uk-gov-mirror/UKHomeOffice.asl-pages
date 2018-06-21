const { merge } = require('lodash');
const { combineReducers } = require('redux');
const path = require('path');
const findRoot = require('find-root');
const express = require('express');
const rootReducer = require('./reducers');

const lookup = (...args) => {
  if (!args.length) {
    return undefined;
  }
  try {
    return require(args.shift());
  } catch (err) {
    return lookup(...args);
  }
};

module.exports = ({
  root,
  paths = [],
  content = {},
  contentPath = '../content'
}) => {
  const app = express.Router();

  // always serve on slash
  paths.unshift('/');

  const pagePath = path.relative(findRoot(root), root);

  const pages = paths.reduce((all, templatePath) => {
    const getFilePath = dir => path.resolve(root, `./${dir}${templatePath === '/' ? '/index' : templatePath}`);
    const template = require(getFilePath('views'));
    const content = lookup(
      getFilePath('content'),
      path.resolve(root, contentPath)
    );
    return {
      ...all,
      [templatePath]: {
        content,
        template: template.default || template
      }
    };
  }, {});

  const locals = (req, res, next) => {
    const url = req.baseUrl === '/'
      ? ''
      : req.baseUrl;

    const filename = req.path.replace('/', '') || 'index';

    Object.assign(res.locals, {
      scripts: [`/public/js/${pagePath}/${filename}/bundle.js`],
      rootReducer: combineReducers(rootReducer),
      static: {
        url,
        content: merge({}, res.locals.static.content, pages[req.path].content, content)
      }
    });
    res.template = pages[req.path].template;
    return next();
  };

  app.all(paths, locals);

  return app;
};
