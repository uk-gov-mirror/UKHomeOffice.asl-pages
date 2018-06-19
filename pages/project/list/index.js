const page = require('../../../lib/page');
const moment = require('moment');
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
      const today = moment().format('YYYY-MM-DD');
      const query = {
        expiryDate: {
          $gte: today
        }
      };
      req.datatable.apiPath = [`/establishment/${req.establishment}/projects`, { query }];
      next();
    }
  })({ schema }));

  return app;
};
