const { Router } = require('express');
const routes = require('./routes');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {

    next();
  });

  return app;
};

module.exports.routes = routes;
