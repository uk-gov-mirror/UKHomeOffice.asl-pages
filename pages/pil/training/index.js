const page = require('../../../lib/page');
const { certificate, modules } = require('./routers');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/modules'],
    ...settings
  });

  app.param('training', (req, res, next, trainingModuleId) => {
    if (trainingModuleId === 'modules') {
      return next('route');
    }
    req.trainingModuleId = trainingModuleId;
    next();
  });

  app.post('/:training', (req, res, next) => {
    const { action, referrer } = req.query;
    if (action !== 'delete') {
      return next();
    }
    req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/training/${req.trainingModuleId}`, { method: 'DELETE' })
      .then(() => res.redirect(referrer))
      .catch(next);
  });

  app.use('/modules', modules());
  app.use('/', certificate());

  return app;
};
