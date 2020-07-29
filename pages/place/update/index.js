const { page } = require('@asl/service/ui');
const confirm = require('./routers/confirm');
const update = require('./routers/update');
const success = require('../../success');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use('/confirm', confirm());

  app.use('/success', success());

  app.use('/', update());

  return app;
};
