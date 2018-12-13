const { Router } = require('express');

module.exports = ({ model = 'model' } = {}) => {
  const app = Router();

  app.get('/', (req, res, next) => {
    const id = (req.model && req.model.id) || `new-${model}`;
    if (req.session.form && req.session.form[id]) {
      delete req.session.form[id];
    }
    next();
  });

  return app;
};
