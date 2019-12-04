const { page } = require('@asl/service/ui');
const { schema } = require('../schema');
const { buildModel } = require('../../../lib/utils');
const create = require('./routers/create');
const confirm = require('./routers/confirm');
const success = require('../../common/routers/success');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use((req, res, next) => {
    req.model = buildModel(schema);
    req.model.id = 'new-place';
    next();
  });

  app.use('/confirm', confirm());

  app.use('/success', success({
    model: 'place',
    licence: 'pel',
    type: 'amendment',
    status: 'resubmitted'
  }));

  app.use('/', create());

  return app;
};
