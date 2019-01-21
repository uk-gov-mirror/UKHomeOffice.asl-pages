const { page } = require('@asl/service/ui');
const router = require('./router');

module.exports = (settings = {}) => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(router({ tabs: settings.tabs }));

  return app;
};
