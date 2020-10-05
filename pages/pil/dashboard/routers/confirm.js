const { Router } = require('express');
const { get } = require('lodash');
const form = require('../../../common/routers/form');
const schema = require('../schema/confirm');

module.exports = settings => {
  const app = Router();

  app.use((req, res, next) => {
    console.log('HERE');
    next();
  });

  app.use(form({
    schema,
    configure: (req, res, next) => {
      console.log('IN CONFIGURE');
      next();
    },
    editAnswers: (req, res, next) => {
      delete req.session.form[req.model.id].validationErrors;
      return res.redirect(req.buildRoute('pil.update'));
    },
    cancelEdit: (req, res, next) => {
      delete req.session.form[req.model.id];
      return res.redirect(req.buildRoute('pil.read'));
    }
  }));

  app.post('/', (req, res, next) => {
    settings.sendData(req)
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('pil.update', { suffix: 'success' }));
      })
      .catch(next);
  });

  return app;
};
