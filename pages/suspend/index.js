const { page } = require('@asl/service/ui');
const update = require('./routers/update');
const confirm = require('./routers/confirm');
const success = require('../success');

module.exports = ({ modelType, action }) => () => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success']
  });

  app.use((req, res, next) => {
    res.locals.static.modelType = modelType;
    res.locals.static.action = action;
    next();
  });

  app.use('/', update({ modelType, action }));
  app.use('/confirm', confirm({ modelType, action }));
  app.use('/success', success());

  return app;
};
