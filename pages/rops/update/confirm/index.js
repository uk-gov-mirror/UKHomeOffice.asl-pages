const { page } = require('@asl/service/ui');

module.exports = () => {
  const app = page({ root: __dirname });

  app.param('step', (req, res, next, step) => {
    res.locals.static.step = step;
    next();
  });

  app.use((req, res, next) => {
    if ((req.model.procedures.length || []).length === 0) {
      // skip this warning page if no completed procedure rows have been added yet
      return res.redirect(req.buildRoute('rops.update', { step: req.params.step }));
    }
    next();
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
