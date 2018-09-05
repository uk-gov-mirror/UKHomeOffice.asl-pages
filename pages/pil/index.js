const { Router } = require('express');

module.exports = () => {
  const app = Router();

  app.use('/apply', require('./dashboard')());

  app.get('/', require('./categories')());

  return app;
};
