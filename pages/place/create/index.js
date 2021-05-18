const { page } = require('@asl/service/ui');
const { baseSchema } = require('../schema');
const { buildModel } = require('../../../lib/utils');
const create = require('./routers/create');
const confirm = require('./routers/confirm');
const success = require('../../success');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use((req, res, next) => {
    const schema = baseSchema();
    req.model = buildModel(schema);
    req.model.id = 'new-place';
    next();
  });

  app.use('/confirm', confirm());

  app.use('/success', success());

  app.use('/', create());

  // prevent fallthrough to place.read router
  app.get('/', (req, res) => res.sendResponse());

  return app;
};
