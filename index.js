const path = require('path');
const express = require('express');
const { merge } = require('lodash');
const content = require('./pages/common/content');
const page = require('./lib/page');
const pages = require('./pages');
const routers = require('./pages/common/routers');

module.exports = {
  page,
  pages,
  routers,
  content: (req, res, next) => {
    res.locals.static = res.locals.static || {};
    res.locals.static.content = merge({}, content, res.locals.static.content);
    next();
  },
  assets: express.static(path.resolve(__dirname, './pages/common/dist')),
  views: path.resolve(__dirname, './pages/common/views')
};
