const { Router } = require('express');
const routes = require('./routes');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('trainingCourseId', (req, res, next, id) => {
    if (id === 'get-autocomplete-projects') {
      return next('router');
    }
    req.api(`/establishment/${req.establishmentId}/training-course/${id}`)
      .then(response => response.json.data)
      .then(trainingCourse => {
        req.trainingCourseId = id;
        req.trainingCourse = trainingCourse;
        req.model = trainingCourse;
        res.locals.static.trainingCourse = trainingCourse;
        res.locals.model = trainingCourse;
        next();
      })
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
