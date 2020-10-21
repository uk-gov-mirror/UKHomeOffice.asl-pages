const { Router } = require('express');
const { merge } = require('lodash');
const content = require('../content');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.post('/', (req, res, next) => {
    const { isExemption } = req.model;
    const apiPrefix = req.establishmentId
      ? `/establishment/${req.establishmentId}/profile/${req.profileId}`
      : '/me';
    req.api(`${apiPrefix}/certificate/${req.certificateId}`, { method: 'DELETE' })
      .then(() => {
        res.locals.static.content = merge({}, res.locals.static.content, content);
        req.notification({ key: 'success', action: 'deleted', isExemption });
        res.redirect(req.buildRoute(`${res.locals.static.basePage}.dashboard`));
      })
      .catch(next);
  });

  return app;
};
