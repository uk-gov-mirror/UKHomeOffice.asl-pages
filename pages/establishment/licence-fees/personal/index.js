const { page } = require('@asl/service/ui');
const { datatable } = require('../../../common/routers');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(datatable({
    configure: (req, res, next) => {
      req.datatable.sort = { column: 'licenceHolder', ascending: true };
      next();
    },
    getApiPath: (req, res, next) => {
      const { startDate, endDate } = req.financialYear;
      const query = {
        filters: {
          startDate,
          endDate
        }
      };
      req.datatable.apiPath = [`/establishment/${req.establishmentId}/pils`, { query }];
      next();
    }
  })({ schema, defaultRowCount: 30 }));

  return app;
};
