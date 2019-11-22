const { Router } = require('express');
const confirm = require('../../routers/confirm');

module.exports = settings => {
  const app = Router();

  app.use((req, res, next) => {
    confirm({
      page: 'place.update',
      method: 'PUT',
      apiUrl: `/establishment/${req.establishmentId}/place/${req.model.id}`
    })(req, res, next);
  });

  app.get('/', (req, res) => res.sendResponse());

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('place.update', { suffix: 'success' }));
  });

  return app;
};
