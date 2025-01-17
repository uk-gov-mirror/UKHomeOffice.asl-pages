const { pickBy } = require('lodash');
const { page } = require('@asl/service/ui');
const datatable = require('../../common/routers/datatable');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(datatable({
    filters: Object.keys(pickBy(schema, s => s.filter)),
    configure: (req, res, next) => {
      req.datatable.sort = { column: 'site', ascending: true };
      next();
    },
    getApiPath: (req, res, next) => {
      req.datatable.apiPath = `/search/establishment/${req.establishmentId}/places`;
      next();
    }
  })({ schema, defaultRowCount: 50 }));

  return app;
};
