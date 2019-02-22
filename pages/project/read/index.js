const { page } = require('@asl/service/ui');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.breadcrumb('project.read');
    console.log('HI FROM PROJ');
    next();
  });

  app.use((req, res, next) => {
    res.locals.model = req.project;
    res.locals.static.establishment = req.establishment;
    res.locals.static.openTasks = req.openTasks;
    next();
  });

  app.post('/', (req, res, next) => {
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/fork`, { method: 'POST' })
      .then(({ json: { data } }) => {
        req.versionId = data.data.id;
        res.redirect(req.buildRoute('project.version'));
      })
      .catch(next);
  });

  app.post('/delete', (req, res, next) => {
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}`, { method: 'DELETE' })
      .then(() => res.redirect(req.buildRoute('project.list')))
      .catch(next);
  });

  return app;
};
