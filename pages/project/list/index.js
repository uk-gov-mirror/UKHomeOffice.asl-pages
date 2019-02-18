const { set } = require('lodash');
const { page } = require('@asl/service/ui');
const format = require('date-fns/format');
const datatable = require('../../common/routers/datatable');
const schema = require('../schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.breadcrumb('project.list');
    next();
  });

  app.use(datatable({
    configure: (req, res, next) => {
      const status = req.query.status || 'active';
      req.datatable.sort = req.query.status === 'inactive'
        ? { column: 'updatedAt', ascending: false }
        : { column: 'expiryDate', ascending: true };
      req.datatable.schema = schema(status);
      next();
    },
    locals: (req, res, next) => {
      set(res.locals, 'static.status', req.query.status || 'active');
      next();
    },
    getApiPath: (req, res, next) => {
      const today = format(new Date(), 'YYYY-MM-DD');
      const query = {
        expiryDate: {
          $gte: today
        },
        status: req.query.status || 'active'
      };
      req.datatable.apiPath = [`/establishment/${req.establishmentId}/projects`, { query }];
      next();
    }
  })({ schema }));

  return app;
};
