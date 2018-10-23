const { pick } = require('lodash');
const page = require('../../../lib/page');
const { schema } = require('../schema');
const confirm = require('../routers/confirm');
const form = require('../../common/routers/form');
const successRouter = require('../../common/routers/success');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use(form({
    model: 'place',
    schema: {
      comments: {
        inputType: 'textarea'
      }
    },
    locals: (req, res, next) => {
      res.locals.model = pick(req.model, Object.keys(schema));
      res.locals.static = res.locals.static || {};
      res.locals.static.schema = schema;
      return next();
    },
    cancelEdit: (req, res, next) => {
      return res.redirect(req.buildRoute('place.list'));
    }
  }));

  app.post('/', (req, res, next) => {
    const { id } = req.model;
    return res.redirect(req.buildRoute('place.delete.confirm', {establishment: req.establishmentId, id}));
  });

  app.use('/confirm', confirm());

  app.get('/confirm', (req, res, next) => {
    res.locals.model = req.model;
    res.locals.static.values = req.form.values;
    return next();
  });

  app.post('/confirm', (req, res, next) => {
    const opts = {
      method: 'DELETE'
    };
    return req.api(`/establishment/${req.establishmentId}/place/${req.model.id}`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/confirm', (req, res, next) => {
    const {id} = req.model;
    return res.redirect(req.buildRoute('place.delete.success', {establishment: req.establishmentId, id}));
  });

  app.use('/success', successRouter({ model: 'place' }));

  return app;
};
