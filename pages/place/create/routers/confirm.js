const { Router } = require('express');
const confirm = require('../../routers/confirm');
const { getNacwoById } = require('../../../common/helpers');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    confirm({
      method: 'POST',
      apiUrl: `/establishment/${req.establishmentId}/place`
    })(req, res, next);
  });

  app.get('/', (req, res, next) => {
    return getNacwoById(req, req.form.values.nacwo)
      .then(nacwo => {
        Object.assign(res.locals.model, { ...req.form.values, nacwo });
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res) => res.sendResponse());

  app.post('/', (req, res, next) => {
    return res.redirect(`${req.buildRoute('place.create')}/success`);
  });

  return app;
};
