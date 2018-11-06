const { Router } = require('express');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('pilId', (req, res, next, pilId) => {
    if (pilId === 'create') {
      return next('route');
    }
    req.pilId = pilId;
    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${pilId}`)
      .then(({ json: { data } }) => {
        req.pil = data;
      })
      .then(() => next())
      .catch(next);
  });

  app.use('/:pilId/edit', require('./update')());
  app.use('/:pilId/delete', require('./delete')());
  app.use('/:pilId', require('./read')());

  app.use('/create', require('./create')());

  app.get('/', (req, res, next) => {
    res.redirect(req.buildRoute('pil.create'));
  });

  return app;
};
