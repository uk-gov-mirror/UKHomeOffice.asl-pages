const { Router } = require('express');
const routes = require('./routes');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/rops/${req.ropId}`)
      .then(({ json: { data } }) => {
        req.rop = data;
        req.version = req.rop.project.granted;
        Object.assign(res.locals.static, {
          rop: req.rop,
          project: req.rop.project
        });
      })
      .then(() => next())
      .catch(next);
  });

  app.use((req, res, next) => {
    req.model = req.rop;
    res.locals.static.year = `${(new Date()).getFullYear()}`;
    next();
  });

  return app;
};

module.exports.routes = routes;
