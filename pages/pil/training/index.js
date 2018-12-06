const { page } = require('@asl/service/ui');
const { certificate, modules, exempt } = require('./routers');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/modules', '/exempt'],
    ...settings
  });

  app.param('certificateId', (req, res, next, certificateId) => {
    if (certificateId === 'modules') {
      return next('route');
    }
    req.certificateId = certificateId;
    next();
  });

  app.post('/:certificateId', (req, res, next) => {
    const { action, referrer } = req.query;
    if (action !== 'delete') {
      return next();
    }
    req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/certificate/${req.certificateId}`, { method: 'DELETE' })
      .then(() => res.redirect(referrer))
      .catch(next);
  });

  app.use('/modules', modules());
  app.use('/exempt', exempt());
  app.use('/', certificate());

  return app;
};
