const { merge } = require('lodash');
const page = require('../../../lib/page');
const edit = require('../routers/edit');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use(edit());

  return app;
};
