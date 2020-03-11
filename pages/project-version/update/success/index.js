const page = require('@asl/service/ui/page');
const success = require('../../../common/routers/success');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.model = req.version;
    next();
  });

  app.use(success({
    licence: 'project',
    getModel: req => req.project
  }));

  app.use((req, res, next) => res.sendResponse());

  return app;
};
