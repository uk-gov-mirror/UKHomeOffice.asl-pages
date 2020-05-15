const { Router } = require('express');
const confirm = require('../../routers/confirm');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    confirm({
      page: 'place.create',
      method: 'POST',
      apiUrl: `/establishment/${req.establishmentId}/place`
    })(req, res, next);
  });

  app.get('/', (req, res, next) => {
    res.locals.model = res.locals.static.values;
    return next();
  });

  app.get('/', (req, res) => res.sendResponse());

  app.post('/', (req, res, next) => {
    delete req.session.form[req.model.id];
    return res.redirect(req.buildRoute('place.create', { suffix: 'success' }));
  });

  return app;
};
