const { Router } = require('express');
const routes = require('./routes');

module.exports = settings => {
  return Router({ mergeParams: true });
};

module.exports.routes = routes;
