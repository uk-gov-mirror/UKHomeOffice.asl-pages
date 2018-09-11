const page = require('../../../lib/page');
const datatable = require('../../common/routers/datatable');
const schema = require('./schema');
const { permissions } = require('../../../lib/middleware');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(permissions('establishment.list'));

  app.use(datatable()({
    apiPath: '/establishments',
    schema
  }));

  return app;
};
