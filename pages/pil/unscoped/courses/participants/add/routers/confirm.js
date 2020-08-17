const { Router } = require('express');
const { get, pick } = require('lodash');
const { form } = require('../../../../../../common/routers');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use(form());

  app.post('/', (req, res, next) => {
    const values = get(req.session, `form[${req.model.id}].values`);

    const params = {
      method: 'POST',
      json: {
        data: pick(values, 'firstName', 'lastName', 'email', 'dob', 'trainingNeed')
      }
    };

    req.api(`/establishment/${req.establishmentId}/training-course/${req.trainingCourseId}/training-pils`, params)
      .then(() => {
        delete req.session.form[req.model.id];
        req.notification({ key: 'success' });
        res.redirect(`${req.buildRoute('pils.courses')}`);
      })
      .catch(next);
  });

  return app;
};
