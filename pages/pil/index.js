const { Router } = require('express');
const { permissions } = require('../../lib/middleware');

const create = require('./create');
const read = require('./read');
const update = require('./update');
const remove = require('./delete');
const revoke = require('./revoke');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('pilId', (req, res, next, pilId) => {
    if (pilId === 'create') {
      return next('route');
    }
    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${pilId}`)
      .then(({ json: { data, meta } }) => {
        req.model = data;
        req.pilId = pilId;
        req.model.openTasks = meta.openTasks || [];
      })
      .then(() => next())
      .catch(next);
  });

  app.use('/:pilId/revoke', permissions('pil.update'), revoke());
  app.use('/:pilId/edit', update());
  app.use('/:pilId/delete', remove());
  app.use('/:pilId', read());
  app.use('/create', create());

  app.get('/', (req, res, next) => {
    res.redirect(req.buildRoute('pil.create'));
  });

  return app;
};
