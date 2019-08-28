const { Router } = require('express');
const { schema } = require('./schema');
const { cleanModel, buildModel } = require('../../lib/utils');
const { permissions } = require('../../lib/middleware');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('id', (req, res, next, id) => {
    if (id === 'create') {
      req.model = buildModel(schema);
      req.model.id = 'new-place';
      return next('route');
    }
    return req.api(`/establishment/${req.establishmentId}/place/${id}`)
      .then(({ json: { data, meta } }) => {
        req.placeId = id;
        res.locals.static.establishment = meta.establishment;
        req.model = cleanModel(data);
        req.model.openTasks = meta.openTasks || [];
      })
      .then(() => next())
      .catch(next);
  });

  app.use((req, res, next) => {
    req.breadcrumb('place.list');
    next();
  });

  app.use('/:id/edit', permissions('place.update'), require('./update')());
  app.use('/:id/delete', permissions('place.delete'), require('./delete')());
  app.use('/:id', permissions('place.read'), require('./read')());
  app.use('/create', permissions('place.create'), require('./create')());

  app.get('/', permissions('place.read'), require('./list')());

  return app;
};
