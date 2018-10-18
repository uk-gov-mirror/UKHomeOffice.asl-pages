const { pick } = require('lodash');
const page = require('../../../lib/page');
const { schema } = require('../schema');
const confirm = require('../routers/confirm');
const form = require('../../common/routers/form');
const successRouter = require('../../common/routers/success');
const { routeBuilder } = require('../../../lib/middleware');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use(routeBuilder());

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
      return res.redirect(req.listPath);
    }
  }));

  app.post('/', (req, res, next) => {
    console.log('12', `${req.baseUrl}/confirm`);
    // return res.redirect(req.buildRoute('place.confirm'));
    // 12 /e/8201/places/b2ea7324-9fd5-4ba5-9ff7-f3290d9fdd0d/delete/confirm
    return res.redirect(`${req.baseUrl}/confirm`);
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
    console.log('13', req.originalUrl.replace(/\/confirm/, '/success'));
    // 13 /e/8201/places/b2ea7324-9fd5-4ba5-9ff7-f3290d9fdd0d/delete/success
    return res.redirect(req.originalUrl.replace(/\/confirm/, '/success'));
  });

  app.use('/success', successRouter({ model: 'place' }));

  return app;
};
