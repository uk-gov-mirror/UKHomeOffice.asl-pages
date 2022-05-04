const { get, some } = require('lodash');
const { page } = require('@asl/service/ui');
const { enforcementFlags } = require('../../common/middleware');
const datatable = require('../../common/routers/datatable');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    res.enforcementModel = req.establishment;
    next();
  }, enforcementFlags);

  app.use((req, res, next) => {
    res.locals.pageTitle = `People - ${req.establishment.name}`;
    next();
  });

  app.use((req, res, next) => {
    return req.user.can('profile.read.allCsv', { establishment: req.establishmentId })
      .then(canDownload => {
        res.locals.static.canDownload = canDownload;
      })
      .then(() => next())
      .catch(next);
  });

  app.use(datatable({
    getApiPath: (req, res, next) => {
      req.datatable.apiPath = `/establishment/${req.establishmentId}/profiles`;
      return next();
    },
    getValues: (req, res, next) => {
      function hasPil(profile) {
        if (profile.pil && profile.pil.status === 'active') {
          return true;
        }
        if (profile.trainingPils.find(p => p.status === 'active')) {
          return true;
        }
        return false;
      }
      req.datatable.data.rows = req.datatable.data.rows.map(profile => {
        const roles = profile.roles;
        if (hasPil(profile)) {
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
