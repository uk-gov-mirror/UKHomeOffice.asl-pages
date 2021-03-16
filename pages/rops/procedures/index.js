const { Router } = require('express');
const routes = require('./routes');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('procedureId', (req, res, next, procedureId) => {
    if (procedureId === 'create') {
      return next();
    }
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}/procedure/${procedureId}`)
      .then(({ json: { data } }) => {
        req.procedureId = procedureId;
        req.procedure = data;
        next();
      })
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
