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
    const now = new Date();
    res.redirect(req.buildRoute('establishment.rops.overview', {
      // default to previous year in Jan-Jun
      year: now.getMonth() < 6 ? now.getFullYear() - 1 : now.getFullYear()
    }));
  });

  return app;
};

module.exports.routes = routes;
