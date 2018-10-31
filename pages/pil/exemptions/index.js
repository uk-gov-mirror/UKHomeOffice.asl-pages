const page = require('../../../lib/page');
const { modules, exempt } = require('./routers');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/modules']
  });

  app.post('/:exemption', (req, res, next) => {
    if (req.query.action !== 'delete') {
      return next();
    }
    req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/exemption/${req.params.exemption}`, { method: 'DELETE' })
      .then(() => {
        res.redirect(req.query.referrer);
      })
      .catch(next);
  });

  app.use('/', exempt());

  app.use('/modules', modules());

  return app;
};
