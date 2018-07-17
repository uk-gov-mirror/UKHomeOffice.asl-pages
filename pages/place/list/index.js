const { pickBy } = require('lodash');
const page = require('../../../lib/page');
const datatable = require('../../common/routers/datatable');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(datatable({
    filters: Object.keys(pickBy(schema, s => s.filter)),
    getApiPath: (req, res, next) => {
      req.datatable.apiPath = `/establishment/${req.establishment}/places`;
      next();
    }
  })({ schema }));

  return app;
};
