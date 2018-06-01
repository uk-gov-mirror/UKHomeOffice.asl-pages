const { Router } = require('express');

module.exports = settings => {
  const app = Router();

  app.get('/', (req, res, next) => {
    if (req.session.data && req.session.data[req.place]) {
      delete req.session.data[req.place];
    }
    next();
  });

  return app;
};
