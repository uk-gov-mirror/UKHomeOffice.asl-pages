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
    req.user.can('project.update', params)
      .then(canUpdate => {
        const openTask = req.project.openTasks[0];
        const openAmendment = openTask && openTask.data.action === 'grant';
        const openRevocation = openTask && openTask.data.action === 'revoke';

        res.locals.static.openTask = openTask;
        res.locals.static.openAmendment = openAmendment;
        res.locals.static.openRevocation = openRevocation;

        res.locals.static.editPerms = {
          canUpdate,
          canAmend: canUpdate && req.project.status === 'active' && !openTask,
          canDeleteDraft: canUpdate && !openTask && !req.project.granted && (req.project.draft || req.project.withdrawn),
          canUpdateLicenceHolder: canUpdate && ((req.project.granted && !req.project.draft) || !req.project.granted) && !req.project.submitted && !openTask,
          canRevoke: req.project.status === 'active' && (canUpdate || req.user.profile.asruUser) && !openTask
        };
      })
      .then(() => next())
      .catch(next);
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
