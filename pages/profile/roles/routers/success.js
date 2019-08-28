const { Router } = require('express');
const success = require('../../../common/routers/success');

module.exports = () => {
  const app = Router();

  app.get('/', (req, res, next) => {
    req.breadcrumb('role.success');
    next();
  });

  app.use(success({
    licence: 'pel',
    type: 'amendment',
    status: 'resubmitted'
  }));

  return app;
};
