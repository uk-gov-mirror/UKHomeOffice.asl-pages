const { Router } = require('express');
const { cleanModel } = require('../../lib/utils');
const { populateNamedPeople, validateUuidParam } = require('../common/middleware');
const routes = require('./routes');
const content = require('./content');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.use(populateNamedPeople);

  app.param('placeId', validateUuidParam());
  app.param('placeId', (req, res, next, placeId) => {
    const params = req.path.match(/delete\/success$/)
      ? { query: { withDeleted: true } }
      : {};

    return req.api(`/establishment/${req.establishmentId}/place/${placeId}`, params)
      .then(({ json: { data, meta } }) => {
        req.placeId = placeId;
        res.locals.static.establishment = meta.establishment;
        req.place = cleanModel(data);
        req.place.nacwos = req.place.roles.filter(r => r.type === 'nacwo').map(r => r.id);
        req.place.nvssqps = req.place.roles.filter(r => ['nvs', 'sqp'].includes(r.type)).map(r => r.id);
        req.model = req.place;
        req.model.openTasks = meta.openTasks || [];
        res.locals.static.place = req.place; // used by breadcrumb for place.name
      })
      .then(() => next())
      .catch(next);
  });

  app.use((req, res, next) => {
    res.locals.pageTitle = `${content.title} - ${req.establishment.name}`;
    next();
  });

  return app;
};

module.exports.routes = routes;
