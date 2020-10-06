const { Router } = require('express');
const { get } = require('lodash');
const form = require('../../../common/routers/form');
const schema = require('../schema/confirm');

module.exports = settings => {
  const app = Router();

  app.use(form({
    schema,
    editAnswers: (req, res, next) => {
      delete req.session.form[req.model.id].validationErrors;
      return res.redirect(req.buildRoute('pil.update'));
    },
    cancelEdit: (req, res, next) => {
      delete req.session.form[req.model.id];
      delete req.session.form[`${req.model.id}-species`];
      delete req.session.form[`${req.model.id}-procedures`];
      return res.redirect(req.buildRoute('profile.read'));
    }
  }));

  app.post('/', (req, res, next) => {
    const { comment } = req.session.form[req.model.id].values;

    settings.sendData(req, { meta: { comment } })
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('pil.update', { suffix: 'success' }));
      })
      .catch(next);
  });

  return app;
};
