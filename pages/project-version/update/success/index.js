const page = require('@asl/service/ui/page');
const success = require('../../../success');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(success());

  app.use((req, res, next) => res.sendResponse());

  return app;
};
