const { page } = require('@asl/service/ui');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use((req, res, next) => {
    res.locals.static.hasProcs = !!req.rop.procedures.length;
    next();
  });

  app.post('/', (req, res, next) => {
    if (req.rop.procedures.length) {
      return next(new Error('Cannot submit nil return as procedures have already been added.'));
    }
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}/submit`, { method: 'POST' })
      .then(() => {
        res.redirect(req.buildRoute('project.read'));
      })
      .catch(next);
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
