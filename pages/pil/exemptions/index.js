const page = require('../../../lib/page');
const { buildModel } = require('../../../lib/utils');
const { modules, exempt } = require('./routers');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/modules'],
    ...settings
  });

  app.use('/', exempt());

  app.use('/modules', modules());

  return app;
};
