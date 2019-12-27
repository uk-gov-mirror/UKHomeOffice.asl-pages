const { Router } = require('express');
const routes = require('./routes');
const { populateNamedPeople } = require('../common/middleware');
const { financialYears } = require('./licence-fees/constants');
const { last } = require('lodash');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.param('year', (req, res, next, year) => {
    let financialYear = financialYears[year];
    if (!financialYear) {
      const key = last(Object.keys(financialYears));
      financialYear = financialYears[key];
    }
    req.financialYear = financialYear;
    next();
  });

  app.use(
    (req, res, next) => {
      req.api(`/establishment/${req.establishmentId}`)
        .then(response => {
          req.establishment = response.json.data;
          req.establishment.openTasks = response.json.meta.openTasks || [];
        })
        .then(() => next())
        .catch(next);
    }
  );

  app.use(populateNamedPeople);

  app.use((req, res, next) => {
    res.locals.static.profile = req.user.profile;
    res.locals.static.establishment = req.establishment;
    next();
  });

  return app;
};

module.exports.routes = routes;
