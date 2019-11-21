const { Router } = require('express');
const update = require('../../routers/update');

module.exports = () => {
  const app = Router();

  app.use('/', update());

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('place.update', { suffix: 'confirm' }));
  });

  return app;
};
