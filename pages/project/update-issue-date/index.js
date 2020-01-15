const { page } = require('@asl/service/ui');
const confirm = require('./routers/confirm');
const update = require('./routers/update');

module.exports = () => {
  const app = page({
    root: __dirname,
    paths: ['/confirm']
  });

  app.use((req, res, next) => {
    req.model = req.project;
    next();
  });

  app.use('/', update());
  app.use('/confirm', confirm());

  return app;
};
