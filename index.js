const path = require('path');
const express = require('express');
const { merge } = require('lodash');
const content = require('./pages/common/content');

module.exports = {
  pages: require('./pages'),
  content: (req, res, next) => {
    res.locals.static = res.locals.static || {};
    res.locals.static.content = merge({}, content, res.locals.static.content);
    next();
  },
  assets: express.static(path.resolve(__dirname, './pages/common/dist')),
  views: path.resolve(__dirname, './pages/common/views')
};
