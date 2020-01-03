const { page } = require('@asl/service/ui');
const { datatable } = require('../../../common/routers');
const getSchema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use('/', datatable({
    configure: (req, res, next) => {
      req.datatable.sort = { column: 'licenceHolder', ascending: true };
      req.datatable.schema = getSchema(req);
      next();
    },
    getApiPath: (req, res, next) => {
      const { startDate, endDate } = req.financialYear;
      const query = {
        filters: {
          startDate,
          endDate,
          onlyBillable: !req.user.profile.asruUser
        }
      };
      req.datatable.apiPath = [`/establishment/${req.establishmentId}/pils`, { query }];
      next();
    }
  })({ defaultRowCount: 30 }));

  app.use((req, res, next) => {
    console.log(req.datatable.data);
    next();
  });

  return app;
};
