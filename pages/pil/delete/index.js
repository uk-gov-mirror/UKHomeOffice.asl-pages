const { Router } = require('express');

module.exports = () => {
  const app = Router();

  app.use('/', (req, res, next) => {
    const opts = {
      method: 'DELETE'
    };
    req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/pil/${req.pilId}`, opts)
      .then(() => next())
      .catch(next);
  });

  return app;
};
