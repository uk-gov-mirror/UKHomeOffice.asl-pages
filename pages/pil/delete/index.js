const { Router } = require('express');
const content = require('./content');

module.exports = () => {
  const app = Router();

  app.post('/', (req, res, next) => {
    if (req.pil.status !== 'pending') {
      return next(new Error('Only draft PILs can be discarded'));
    }
    next();
  });

  app.post('/', (req, res, next) => {
    const opts = {
      method: 'DELETE'
    };
    req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/pil/${req.pilId}`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res) => {
    res.locals.static.content = content;
    req.notification({ key: 'discarded' });
    res.redirect(req.buildRoute('profile.read'));
  });

  return app;
};
