const page = require('../../../lib/page');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use('/', (req, res, next) => {
    const establishment = req.user.profile.establishments.find(e => e.id === req.establishment);
    res.locals.static.establishment = establishment;
    res.locals.static.profile = req.user.profile;
    next();
  });

  app.use('/procedures', require('../procedures')());

  app.use('/exemptions', require('../exemptions')());

  app.use('/modules', require('../modules')());

  app.use('/training', require('../training')());

  return app;
};
