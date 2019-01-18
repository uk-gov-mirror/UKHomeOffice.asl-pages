const { Router } = require('express');
const successRouter = require('../../../common/routers/success');

module.exports = action => {
  const app = Router();

  app.get('/', (req, res, next) => {
    req.breadcrumb(`profile.role.${action}.success`);
    res.locals.static.profile = req.profile;
    next();
  });

  app.use(successRouter());

  return app;
};
