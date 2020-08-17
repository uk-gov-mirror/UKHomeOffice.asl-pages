const { Router } = require('express');
const { merge } = require('lodash');
const content = require('../read/content');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.post('/', (req, res, next) => {
    const params = {
      method: 'DELETE'
    };
    req.api(`/establishment/${req.establishmentId}/training-course/${req.trainingCourseId}`, params)
      .then(() => {
        res.locals.static.content = merge({}, res.locals.static.content, content);
        req.notification({ key: 'deleted' });
        res.redirect(req.buildRoute('pils.courses.list'));
      })
      .catch(next);
  });

  return app;
};
