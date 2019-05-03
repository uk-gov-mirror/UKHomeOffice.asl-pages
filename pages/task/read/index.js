const { page } = require('@asl/service/ui');
const { view, extend, confirm, success } = require('./routers');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/extend', '/confirm', '/success']
  });

  app.use('/', view());
  app.use('/extend', extend());
  app.use('/confirm', confirm());
  app.use('/success', success());

  return app;
};
