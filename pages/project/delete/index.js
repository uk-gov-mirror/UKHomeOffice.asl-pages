const { Router } = require('express');
const content = require('./content');

module.exports = () => {
  const app = Router();

  app.post('/draft', (req, res, next) => {
    res.locals.static.content = content;

    if (req.project.status !== 'inactive') {
      return next(new Error('Active projects cannot be deleted.'));
    }

    return req.api(`/establishment/${req.establishmentId}/project/${req.projectId}`, { method: 'DELETE' })
      .then(() => req.notification({ key: 'draftDiscarded' }))
      .then(() => res.redirect(`${req.buildRoute('project.list')}?status=inactive`))
      .catch(next);
  });

  app.post('/amendment', (req, res, next) => {
    res.locals.static.content = content;

    return req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/draft-amendments`, { method: 'DELETE' })
      .then(() => req.notification({ key: 'amendmentDiscarded' }))
      .then(() => res.redirect(req.buildRoute('project.read')))
      .catch(next);
  });

  app.post('/stub', (req, res, next) => {
    res.locals.static.content = content;

    return req.api(`/project/${req.projectId}`, { method: 'DELETE' })
      .then(() => req.notification({ key: 'stubDiscarded' }))
      .then(() => res.redirect(req.buildRoute('project.list')))
      .catch(next);
  });

  return app;
};
