const page = require('../../lib/page');
const datatable = require('../common/routers/datatable');
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
      req.datatable.data = req.datatable.data.map(profile => {
        const roles = profile.roles.map(r => r.type.toUpperCase());
        if (profile.pil) {
          roles.push('PILH');
        }
        if (profile.projects && profile.projects.length) {
          roles.push('PPLH');
        }
        return {
          ...profile,
          roles
        };
      });
      next();
    }
  })({ schema }));

  return app;
};
