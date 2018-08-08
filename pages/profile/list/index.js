const page = require('../../../lib/page');
const datatable = require('../../common/routers/datatable');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(datatable({
    getApiPath: (req, res, next) => {
      req.datatable.apiPath = `/establishment/${req.establishment}/profiles`;
      return next();
    },
    getValues: (req, res, next) => {
      req.datatable.data.rows = req.datatable.data.rows.map(profile => {
        const roles = profile.roles;
        if (profile.pil) {
          roles.push({ type: 'pilh' });
        }
        if (profile.projects && profile.projects.length) {
          roles.push({ type: 'pplh' });
        }
        return {
          ...profile,
          roles
        };
      });
      next();
    }
  })({ schema }));

  app.use((req, res, next) => {
    if (req.session.notifications) {
      res.locals.static.notifications = req.session.notifications;
      delete req.session.notifications;
    }
    next();
  });

  return app;
};
