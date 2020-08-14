const { Router } = require('express');
const { omit, get } = require('lodash');
const confirm = require('../../routers/confirm');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use(confirm());

  app.post('/', (req, res, next) => {
    const values = get(req.session, `form[${req.model.id}].values`);
    const params = {
      method: 'POST',
      json: {
        data: omit(values, 'id')
      }
    };

    req.api(`/establishment/${req.establishmentId}/training-courses`, params)
      .then(response => {
        delete req.session.form[req.model.id];
        const trainingCourseId = get(response, 'json.data.data.id');
        req.notification({ key: 'success' });
        res.redirect(req.buildRoute('pils.courses.read', { trainingCourseId }));
      })
      .catch(next);
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
