const page = require('../../../lib/page');
const format = require('date-fns/format');
const datatable = require('../../common/routers/datatable');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(datatable({
    configure: (req, res, next) => {
      req.datatable.sort = { column: 'expiryDate', ascending: true };
      next();
    },
    getApiPath: (req, res, next) => {
      const today = format(new Date(), 'YYYY-MM-DD');
      const query = {
        expiryDate: {
          $gte: today
        }
      };
      req.datatable.apiPath = [`/establishment/${req.establishmentId}/projects`, { query }];
      next();
    }
  })({ schema }));

  return app;
};
