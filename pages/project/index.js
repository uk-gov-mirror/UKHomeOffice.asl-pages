const { Router } = require('express');
const routes = require('./routes');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.param('projectId', (req, res, next, projectId) => {
    if (projectId === 'create' || projectId === 'import') {
      return next('route');
    }
    req.projectId = projectId;
    return req.api(`/establishment/${req.establishmentId}/projects/${projectId}`)
      .then(({ json: { data, meta } }) => {
        req.project = data;
        req.project.openTasks = meta.openTasks;
        req.establishment = meta.establishment;
        res.locals.static.project = req.project;
      })
      .then(() => next())
      .catch(next);
  });

  app.post('/create', (req, res, next) => {
    req.api(`/establishment/${req.establishmentId}/projects`, { method: 'POST' })
      .then(({ json: { data } }) => {
        req.projectId = data.data.id;

        return req.api(`/establishment/${req.establishmentId}/projects/${req.projectId}`)
          .then(({ json: { data } }) => {
            req.project = data;
          })
          .then(() => res.redirect(req.buildRoute('projectVersion.update', { projectId: req.project.id, versionId: req.project.draft.id })));
      })
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
