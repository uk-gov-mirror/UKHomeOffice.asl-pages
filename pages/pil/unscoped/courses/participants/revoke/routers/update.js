const { Router } = require('express');
const form = require('../../../../../../common/routers/form');
const schema = require('../schema');

module.exports = () => {
  const app = Router();

  app.use(form({
    schema,
    locals(req, res, next) {
      res.locals.static.profile = req.profile;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    res.redirect(req.buildRoute('pils.courses.participants.revoke', { suffix: 'confirm' }));
  });

  return app;
};
