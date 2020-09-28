const { Router } = require('express');
const routes = require('./routes');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('trainingPilId', (req, res, next, id) => {
    if (id === 'add' || id === 'revoke') {
      return next('router');
    }
    req.api(`/establishment/${req.establishmentId}/training-course/${req.trainingCourseId}/training-pil/${id}`)
      .then(response => response.json.data)
      .then(trainingPil => {
        req.trainingPilId = id;
        req.model = req.trainingPil = trainingPil;
        res.locals.model = req.model;
        next();
      })
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
