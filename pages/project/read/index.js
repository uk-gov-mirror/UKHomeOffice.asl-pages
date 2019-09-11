const { page } = require('@asl/service/ui');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    if (!req.project.title) {
      req.project.title = 'Untitled project';
    }

    req.breadcrumb({
      label: 'project.read',
      project: req.project
    });
    next();
  });

  app.use((req, res, next) => {
    res.locals.model = req.project;
    res.locals.static.establishment = req.establishment;
    next();
  });

  app.use((req, res, next) => {
    const params = {
      id: req.projectId,
      licenceHolderId: req.project.licenceHolderId,
      establishment: req.establishment.id
    };
    Promise.resolve()
      .then(() => req.user.can('project.update', params))
      .then(canUpdate => {
        const openTask = req.project.openTasks[0];
        const editable = (!openTask || (openTask && openTask.editable));

        res.locals.static.canUpdate = canUpdate;
        res.locals.static.editable = editable;
        res.locals.static.openTask = openTask;

        if (editable && req.project.status === 'active') {
          return req.user.can('project.revoke', params)
            .then(canRevoke => {
              res.locals.static.canRevoke = canRevoke;
            })
            .then(() => next())
            .catch(next);
        }
        next();
      })
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    res.locals.static.confirmMessage = req.project.status === 'active'
      ? res.locals.static.content.confirm.amendment
      : res.locals.static.content.confirm.application;
    next();
  });

  app.post('/', (req, res, next) => {
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/fork`, { method: 'POST' })
      .then(({ json: { data } }) => {
        req.versionId = data.data.id;
        res.redirect(req.buildRoute('project.version.update'));
      })
      .catch(next);
  });

  return app;
};
