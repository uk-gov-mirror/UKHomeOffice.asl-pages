const { set } = require('lodash');
const { page } = require('@asl/service/ui');
const datatable = require('../../common/routers/datatable');
const schema = require('../schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(datatable({
    configure: (req, res, next) => {
      const status = req.query.status || 'active';

      switch (status) {
        case 'inactive':
          req.datatable.sort = { column: 'updatedAt', ascending: false };
          break;
        case 'inactive-statuses':
          req.datatable.sort = { column: 'title', ascending: true };
          break;
        default:
          req.datatable.sort = { column: 'expiryDate', ascending: true };
          break;
      }

      req.datatable.schema = schema(status);
      next();
    },
    locals: (req, res, next) => {
      set(res.locals, 'static.status', req.query.status || 'active');
      next();
    },
    getApiPath: (req, res, next) => {
      const query = {
        status: req.query.status || 'active'
      };
      req.datatable.apiPath = [`/establishment/${req.establishmentId}/projects`, { query }];
      next();
    }
  })({ schema }));

  return app;
};
