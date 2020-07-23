const { Router } = require('express');
const success = require('../../common/routers/success');

module.exports = () => {
  const app = Router();

  app.use(success());

  return app;
};
