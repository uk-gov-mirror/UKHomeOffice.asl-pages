const { Router } = require('express');
const routes = require('./routes');
const { populateNamedPeople } = require('../common/middleware');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.use((req, res, next) => {
    req.api(`/establishment/${req.establishmentId}`)
      .then(response => {
        req.establishment = response.json.data;
        req.establishment.openTasks = response.json.meta.openTasks || [];
        req.establishment.hasActiveLicences = (req.establishment.activePilsCount + req.establishment.activeProjectsCount) > 0;
      })
      .then(() => next())
      .catch(next);
  });

  app.use((req, res, next) => {
    res.locals.static.profile = req.user.profile;
    res.locals.static.establishment = req.establishment;
    res.locals.pageTitle = req.establishment.name;
    next();
  });

  app.use(['/suspend', '/reinstate'],
    populateNamedPeople,
    (req, res, next) => {
      req.model = req.establishment;
      next();
    }
  );

  return app;
};

module.exports.routes = routes;
