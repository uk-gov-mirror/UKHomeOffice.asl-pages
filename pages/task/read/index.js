const { page } = require('@asl/service/ui');
const { view, confirm, success } = require('./routers');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/confirm', '/success']
  });

  app.use('/', view());
  app.use('/confirm', confirm());
  app.use('/success', success());

  return app;
};
