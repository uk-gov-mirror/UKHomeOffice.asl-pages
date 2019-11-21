const { Router } = require('express');
const update = require('../../routers/update');
const { clearSessionIfNotFromTask } = require('../../../common/middleware');

module.exports = () => {
  const app = Router();

  app.get('/', clearSessionIfNotFromTask());

  app.use(update());

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('place.create', { suffix: 'confirm' }));
  });

  return app;
};
