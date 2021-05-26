const { Router } = require('express');
const routes = require('./routes');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('profileId', (req, res, next, profileId) => {
    if (profileId === 'new') {
      return next('router');
    }

    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/collaborators/${profileId}`)
      .then(({ json: { data } }) => {
        req.collaborator = data;
        res.locals.static.collaborator = data;
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
