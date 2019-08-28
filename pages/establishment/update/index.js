const { page } = require('@asl/service/ui');
const update = require('./routers/update');
const confirm = require('./routers/confirm');
const success = require('../../common/routers/success');
const { groupFlags } = require('./helpers');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use((req, res, next) => {
    req.breadcrumb('establishment.update');
    req.model = groupFlags(req.establishment);
    next();
  });

  app.use('/confirm', confirm());

  app.use('/success', success({
    model: 'establishment',
    licence: 'pel',
    type: 'amendment',
    status: 'resubmitted'
  }));

  app.use('/', update());

  return app;
};
