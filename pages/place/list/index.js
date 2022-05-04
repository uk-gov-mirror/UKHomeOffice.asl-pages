const { pickBy, set, get } = require('lodash');
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

  app.use(datatable({
    filters: Object.keys(pickBy(schema, s => s.filter)),
    configure: (req, res, next) => {
      req.datatable.sort = { column: 'site', ascending: true };
      next();
    },
    getApiPath: (req, res, next) => {
      req.datatable.apiPath = `/search/establishment/${req.establishmentId}/places`;
      next();
    },
    getValues: (req, res, next) => {
      const filters = get(req.datatable, 'filters.options').filter(f => f.key !== 'area');
      set(req.datatable, 'filters.options', filters);
      next();
    }
  })({ schema, defaultRowCount: 50 }));

  return app;
};
