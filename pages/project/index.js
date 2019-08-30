const { Router } = require('express');
const read = require('./read');
const list = require('./list');
const remove = require('./delete');
const revoke = require('./revoke');
const importProject = require('./import');
const updateLicenceHolder = require('./update-licence-holder');
const { permissions } = require('../../lib/middleware');

module.exports = () => {
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
          .then(() => res.redirect(req.buildRoute('project.version.update', { projectId: req.project.id, versionId: req.project.draft.id })));
      })
      .catch(next);
  });

  const checkPermissions = task => (req, res, next) => {
    const params = {
      id: req.projectId,
      licenceHolderId: req.project.licenceHolderId,
      establishment: req.establishment.id
    };
    permissions(task, params)(req, res, next);
  };

  app.use('/', list());
  app.use('/import', permissions('project.apply'), importProject());
  app.use('/:projectId', checkPermissions('project.read.single'), read());
  app.use('/:projectId/update-licence-holder', checkPermissions('project.update'), updateLicenceHolder());
  app.use('/:projectId/delete', checkPermissions('project.delete'), remove());
  app.use('/:projectId/revoke', checkPermissions('project.revoke'), revoke());

  return app;
};
