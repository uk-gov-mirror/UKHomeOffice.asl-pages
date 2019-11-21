const { page } = require('@asl/service/ui');
const confirm = require('./routers/confirm');
const update = require('./routers/update');
const success = require('../../common/routers/success');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use('/confirm', confirm());

  app.use('/success', success({
    model: 'place',
    licence: 'pel',
    type: 'amendment',
    status: 'resubmitted'
  }));

  app.use('/', update());

  return app;
};
