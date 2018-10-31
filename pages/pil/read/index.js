const page = require('../../../lib/page');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.get('/', (req, res, next) => {
    if (req.pil.status !== 'active') {
      return res.redirect(req.buildRoute('pil.update'));
    }
    next();
  });

  app.get('/', (req, res, next) => {
    res.locals.model = req.pil;
    res.locals.static.schema = { status: {} };
    res.locals.static.profile = req.profile;
    next();
  });

  return app;
};
