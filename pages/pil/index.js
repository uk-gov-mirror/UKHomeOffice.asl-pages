const { Router } = require('express');

module.exports = () => {
  const app = Router();

  app.param('pil', (req, res, next, pilId) => {
    if (pilId === 'create') {
      return next();
    }
    req.pilId = pilId;
    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${pilId}`)
      .then(({ json: { data } }) => {
        req.pil = data;
      })
      .then(() => next())
      .catch(next);
  });

  app.use('/:pil/edit', require('./update')());
  app.use('/:pil/delete', require('./delete')());
  app.use('/:pil', require('./read')());

  app.use('/create', (req, res, next) => {
    if (!req.profile.pil) {
      return next();
    }
    res.redirect(req.originalUrl.replace('create', req.profile.pil.id));
  });

  app.use('/create', require('./create')());

  app.get('/', (req, res, next) => {
    res.redirect(`${req.originalUrl}/create`);
  });

  return app;
};
