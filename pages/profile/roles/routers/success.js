const { Router } = require('express');
const success = require('../../../common/routers/success');

module.exports = action => {
  const app = Router();

  app.get('/', (req, res, next) => {
    req.breadcrumb(`profile.role.${action}.success`);
    next();
  });

  app.use(success());

  return app;
};
