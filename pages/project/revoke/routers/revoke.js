const { Router } = require('express');
const form = require('../../../common/routers/form');
const schema = require('../schema');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use(form({
    schema,
    locals(req, res, next) {
      res.locals.static.project = req.project;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    res.redirect(req.buildRoute('project.revoke', { suffix: 'confirm' }));
  });

  return app;
};
