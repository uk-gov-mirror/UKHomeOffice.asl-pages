const { Router } = require('express');
const content = require('../read/content');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.post('/', (req, res, next) => {
    const opts = {
      method: 'DELETE'
    };

    res.locals.static.content = content;

    return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/permission`, opts)
      .then(() => req.notification({ key: 'leftEstablishment', establishment: req.establishment }))
      .then(() => res.redirect(req.buildRoute('dashboard')))
      .catch(next);
  });

  return app;
};
