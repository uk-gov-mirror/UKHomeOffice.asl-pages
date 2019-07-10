const { Router } = require('express');

module.exports = () => {
  const app = Router();

  app.use('/draft', (req, res, next) => {
    if (req.project.status === 'inactive') {
      return req.api(`/establishment/${req.establishmentId}/project/${req.projectId}`, { method: 'DELETE' })
        .then(() => res.redirect(`${req.buildRoute('project.list')}?status=inactive`))
        .catch(next);
    }

    throw new Error('Active projects cannot be deleted.');
  });

  app.use('/amendment', (req, res, next) => {
    const recentDraftVersions = req.project.versions.filter(version => version.status === 'draft' && version.createdAt > req.project.granted.createdAt);

    const promises = recentDraftVersions.map(version => {
      return req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/project-versions/${version.id}`, { method: 'DELETE' });
    });

    return Promise.all(promises)
      .then(() => res.redirect(req.buildRoute('project.read')))
      .catch(next);
  });

  return app;
};
