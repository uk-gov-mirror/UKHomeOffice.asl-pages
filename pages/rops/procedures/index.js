const { Router } = require('express');
const routes = require('./routes');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('procedureId', (req, res, next, procedureId) => {
    if (procedureId === 'create' || procedureId === 'unsubmit') {
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

  app.post('/unsubmit', (req, res, next) => {
    const params = {
      method: 'POST'
    };
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}/unsubmit`, params)
      .then(() => {
        res.redirect(req.buildRoute('rops.procedures'));
      })
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
