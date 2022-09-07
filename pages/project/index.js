const { Router } = require('express');
const { get } = require('lodash');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { validateUuidParam } = require('../common/middleware');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.param('projectId', (req, res, next, projectId) => {
    if (projectId === 'create' || projectId === 'import') {
      return next('route');
    }
    next();
  });

  app.param('projectId', validateUuidParam());
  app.param('projectId', (req, res, next, projectId) => {
    req.projectId = projectId;
    return req.api(`/establishment/${req.establishmentId}/projects/${projectId}`)
      .then(({ json: { data, meta } }) => {
        req.project = data;
        req.model = data; // used by generic suspend router
        req.project.openTasks = meta.openTasks;
        req.establishment = meta.establishment;
        res.locals.static.project = req.project;
        res.locals.pageTitle = `${req.project.title} - ${req.establishment.name}`;
      })
      .then(() => next())
      .catch(next);
  });

  app.post('/create', bodyParser.urlencoded({ extended: true }));

  app.post('/create', (req, res, next) => {
    const opts = {
      method: 'POST',
      json: {
        data: {
          licenceHolderId: get(req.body, 'licenceHolderId', req.user.profile.id)
        }
      }
    };

    req.api(`/establishment/${req.establishmentId}/projects`, opts)
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
