const { Router } = require('express');
const { get, omit } = require('lodash');
const confirm = require('../../routers/confirm');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use(confirm());

  app.post('/', (req, res, next) => {
    const values = get(req.session, `form[${req.model.id}].values`);
    const params = {
      method: 'PUT',
      json: {
        data: omit(values, 'id')
      }
    };

    req.api(`/establishment/${req.establishmentId}/training-course/${req.trainingCourseId}`, params)
      .then(() => {
        delete req.session.form[req.model.id];
        req.notification({ key: 'success' });
        res.redirect(req.buildRoute('pils.courses.read'));
      })
      .catch(next);
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
