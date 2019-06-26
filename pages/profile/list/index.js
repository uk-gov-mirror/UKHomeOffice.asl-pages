const { get, some } = require('lodash');
const { page } = require('@asl/service/ui');
const datatable = require('../../common/routers/datatable');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(datatable({
    getApiPath: (req, res, next) => {
      req.datatable.apiPath = `/establishment/${req.establishmentId}/profiles`;
      return next();
    },
    getValues: (req, res, next) => {
      req.datatable.data.rows = req.datatable.data.rows.map(profile => {
        const roles = profile.roles;
        if (profile.pil && profile.pil.status === 'active') {
          roles.push({ type: 'pilh' });
        }
        if (profile.projects && profile.projects.length && some(profile.projects, p => p.status === 'active')) {
          roles.push({ type: 'pplh' });
        }
        if (get(profile, 'establishments[0].role') === 'admin') {
          roles.push({ type: 'admin' });
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
