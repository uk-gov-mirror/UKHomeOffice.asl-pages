const { Router } = require('express');

module.exports = () => {
  const app = Router();

  app.post('/draft', (req, res, next) => {
    if (req.project.status === 'inactive') {
      return req.api(`/establishment/${req.establishmentId}/project/${req.projectId}`, { method: 'DELETE' })
        .then(() => res.redirect(`${req.buildRoute('project.list')}?status=inactive`))
        .catch(next);
    }

    throw new Error('Active projects cannot be deleted.');
  });

  app.post('/amendment', (req, res, next) => {
    return req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/draft-amendments`, { method: 'DELETE' })
      .then(() => res.redirect(req.buildRoute('project.read')))
      .catch(next);
  });

  return app;
};
