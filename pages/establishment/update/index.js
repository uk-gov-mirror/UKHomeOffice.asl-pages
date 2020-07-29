const { page } = require('@asl/service/ui');
const update = require('./routers/update');
const confirm = require('./routers/confirm');
const success = require('../../success');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use((req, res, next) => {
    req.model = req.establishment;
    next();
  });

  app.use('/confirm', confirm());

  app.use('/success', success());

  app.use('/', update());

  return app;
};
