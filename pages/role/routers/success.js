const { Router } = require('express');
const success = require('../../success');

module.exports = () => {
  const app = Router();

  app.use(success());

  return app;
};
