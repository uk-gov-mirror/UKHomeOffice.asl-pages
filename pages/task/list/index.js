const { Router } = require('express');

module.exports = (settings = {}) => {
  const app = Router();

  app.get('/', (req, res) => res.redirect(req.buildRoute('dashboard')));

  return app;
};
