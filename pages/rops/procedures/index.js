const { Router } = require('express');
const { set } = require('lodash');
const content = require('./content');
const routes = require('./routes');

const isNilReturn = rop => !rop.proceduresCompleted || !rop.postnatal;

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('procedureId', (req, res, next, procedureId) => {
    if (procedureId === 'create' || procedureId === 'unsubmit' || procedureId === 'review') {
      return next();
    }
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}/procedure/${procedureId}`)
      .then(({ json: { data } }) => {
        req.procedureId = procedureId;
        req.procedure = data;
        res.locals.static.rop = req.rop;
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
        set(res.locals, 'static.content.notifications', content.notifications);
        if (isNilReturn(req.rop)) {
          return res.redirect(req.buildRoute('rops.nil-return'));
        }
        res.redirect(req.buildRoute('rops.procedures'));
      })
      .catch(next);
  });

  app.get('*', (req, res, next) => {
    if (req.rop.status === 'draft' && isNilReturn(req.rop)) {
      return res.redirect(req.buildRoute('rops.nil-return'));
    }
    next();
  });

  return app;
};

module.exports.routes = routes;
