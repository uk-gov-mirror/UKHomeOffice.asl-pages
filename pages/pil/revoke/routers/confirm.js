const { Router } = require('express');
const { get } = require('lodash');
const form = require('../../../common/routers/form');
const { saveTaskIdToSession } = require('../../../common/helpers');

module.exports = () => {
  const app = Router();

  app.use(form({
    locals(req, res, next) {
      res.locals.model = get(req.session, `form.${req.model.id}.values`);
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const comments = get(req.session, `form.${req.model.id}.values.comments`);
    const params = {
      method: 'PUT',
      json: {
        meta: {
          comments
        }
      }
    };
    req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${req.pilId}/revoke`, params)
      .then(saveTaskIdToSession(req.session))
      .then(() => {
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('pil.revoke', { suffix: 'success' }));
      })
      .catch(next);
  });

  return app;
};
