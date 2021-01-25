const { page } = require('@asl/service/ui');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    if (!req.project.grantedRa) {
      return next();
    }
    req.api(`/establishments/${req.establishmentId}/projects/${req.projectId}/retrospective-assessment/${req.project.grantedRa.id}`)
      .then(({ json: { data } }) => {
        req.project.grantedRa = data;
      })
      .then(() => next())
      .catch(next);
  });

  app.use((req, res, next) => {
    res.locals.static.project = req.project;
    res.locals.static.version = req.version;
    res.locals.static.basename = req.originalUrl.replace(/\/nts$/, '');
    res.locals.static.isAsru = req.user.profile.asruUser;
    next();
  });

  app.use((req, res) => res.sendResponse());

  return app;
};
