const page = require('../../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use('/procedures', require('../procedures')());

  app.use('/exemptions', require('../exemptions')());

  app.use('/modules', require('../modules')());

  app.use('/training', require('../training')());

  return app;
};
