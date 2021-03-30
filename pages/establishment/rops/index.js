const { Router } = require('express');
const routes = require('./routes');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.param('year', (req, res, next, year) => {
    req.year = year;
    res.locals.static.year = year;
    next();
  });

  app.get('/', (req, res, next) => {
    res.redirect(req.buildRoute('establishment.rops.overview', { year: new Date().getFullYear() }));
  });

  return app;
};

module.exports.routes = routes;
