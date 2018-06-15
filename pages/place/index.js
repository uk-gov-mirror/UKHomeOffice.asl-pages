const page = require('../../lib/page');
const routers = require('./routers');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    if (req.place === 'new') {
      // do the things for "new"
    }
    next();
  });

  app.use('/edit', routers.edit());
  app.use('/delete', routers.delete());
  app.use('/', routers.view());

  return app;
};
