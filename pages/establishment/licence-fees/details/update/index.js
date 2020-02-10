const { page } = require('@asl/service/ui');
const { form } = require('../../../../common/routers');
const schema = require('../schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.model = {
      id: `${req.establishment.id}-billing`,
      ...req.establishment.billing
    };
    next();
  });

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    const params = {
      method: 'PUT',
      json: {
        data: req.form.values
      }
    };

    req.api(`/establishment/${req.establishment.id}/billing`, params)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    delete req.session.form[`${req.establishment.id}-billing`];
    req.notification({ key: 'success' });
    res.redirect(req.buildRoute('establishment.fees.details'));
  });

  return app;
};
