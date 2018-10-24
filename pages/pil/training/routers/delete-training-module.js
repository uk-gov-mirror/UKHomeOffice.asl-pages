const { Router } = require('express');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    const opts = { method: 'DELETE' };
    const { referrer } = req.query;
    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/training/${req.trainingModuleId}`, opts)
      .then(() => res.redirect(referrer))
      .catch(next);
  });

  return app;
};
