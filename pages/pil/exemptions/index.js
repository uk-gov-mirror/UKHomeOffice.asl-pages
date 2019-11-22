const { page } = require('@asl/service/ui');
const routes = require('./routes');

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

  return app;
};

module.exports.routes = routes;
