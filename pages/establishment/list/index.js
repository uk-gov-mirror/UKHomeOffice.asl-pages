const page = require('../../../lib/page');
const datatable = require('../../common/routers/datatable');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(datatable()({
    apiPath: '/establishments',
    schema
  }));

  return app;
};
