const { pick } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const success = require('../../common/routers/success');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/success']
  });

  app.use((req, res, next) => {
    req.model = {};
    req.model.id = `${req.establishment.id}-grant`;
    next();
  });

  app.use(form({schema}));

  app.post('/', (req, res, next) => {
    const opts = {
      method: 'PUT',
      json: {
        data: {},
        meta: {
          ...pick(req.session.form[req.model.id].values, 'comments')
        }
      }
    };

    return req.api(`/establishment/${req.establishmentId}/grant`, opts)
      .then(() => delete req.session.form[req.model.id])
      .then(() => res.redirect(req.buildRoute('establishment.apply', { suffix: 'success' })))
      .catch(next);
  });

  app.get('/success',
    (req, res, next) => {
      req.model = req.establishment;
      next();
    },
    success({
      model: 'establishment',
      licence: 'pel'
    })
  );

  return app;
};
