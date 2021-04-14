const { page } = require('@asl/service/ui');
const { datatable } = require('../../../common/routers');
const schema = require('./schema');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use(datatable({
    configure: (req, res, next) => {
      // req.datatable.sort = { column: 'createdAt', ascending: true };
      next();
    },
    getApiPath: (req, res, next) => {
      req.datatable.apiPath = '/me/notifications';
      next();
    }
  })({ schema, defaultRowCount: 50 }));

  return app;
};
