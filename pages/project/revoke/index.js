const { page } = require('@asl/service/ui');
const confirm = require('./routers/confirm');
const success = require('../../success');
const revoke = require('./routers/revoke');

module.exports = () => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success']
  });

  app.use((req, res, next) => {
    req.model = {
      id: `${req.project.id}-revoke`
    };
    next();
  });

  app.use('/', revoke());

  app.use('/confirm', confirm());

  app.use('/success', success());

  return app;
};
