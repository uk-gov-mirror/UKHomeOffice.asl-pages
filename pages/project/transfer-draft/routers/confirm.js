const { Router } = require('express');
const form = require('../../../common/routers/form');

module.exports = () => {
  const app = Router();

  app.use(form({
    locals: (req, res, next) => {
      const targetEstablishmentId = parseInt(req.session.form[req.model.id].values.primaryEstablishment, 10);
      res.locals.static.targetEstablishment = req.user.profile.establishments.find(e => e.id === targetEstablishmentId);
      res.locals.static.establishment = req.establishment;
      next();
    },
    editAnswers: (req, res, next) => {
      delete req.session.form[req.model.id].validationErrors;
      return res.redirect(req.buildRoute('project.transferDraft'));
    },
    cancelEdit: (req, res, next) => {
      delete req.session.form[req.model.id];
      return res.redirect(req.buildRoute('project.read'));
    }
  }));

  app.post('/', (req, res, next) => {
    const targetEstablishmentId = parseInt(req.session.form[req.model.id].values.primaryEstablishment, 10);

    const params = {
      method: 'PUT',
      json: {
        data: {
          targetEstablishmentId
        }
      }
    };

    req.api(`/establishment/${req.establishmentId}/projects/${req.projectId}/transfer-draft`, params)
      .then(response => {
        const project = response.json.data;
        delete req.session.form[req.model.id];
        req.notification({ key: 'success' });
        return res.redirect(req.buildRoute('project.read', {
          establishmentId: project.establishmentId,
          projectId: project.id
        }));
      })
      .catch(next);
  });

  return app;
};
