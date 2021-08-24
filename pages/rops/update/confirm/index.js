const { page } = require('@asl/service/ui');

module.exports = () => {
  const app = page({ root: __dirname });

  app.param('step', (req, res, next, step) => {
    res.locals.static.step = step;
    next();
  });

  return app;
};
