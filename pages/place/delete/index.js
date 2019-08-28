const { pick } = require('lodash');
const { page } = require('@asl/service/ui');
const { schema } = require('../schema');
const confirm = require('../routers/confirm');
const form = require('../../common/routers/form');
const success = require('../../common/routers/success');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use((req, res, next) => {
    req.breadcrumb('place.delete');
    next();
  });

  app.use(form({
    model: 'place',
    schema: {
      comments: {
        inputType: 'textarea'
      }
    },
    locals: (req, res, next) => {
      res.locals.model = pick(req.model, Object.keys(schema), 'tasks');
      res.locals.static = res.locals.static || {};
      res.locals.static.schema = schema;
      return next();
    },
    cancelEdit: (req, res, next) => {
      return res.redirect(req.buildRoute('place.list'));
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(`${req.buildRoute('place.delete')}/confirm`);
  });

  app.use('/confirm', (req, res, next) => {
    confirm({
      method: 'DELETE',
      apiUrl: `/establishment/${req.establishmentId}/place/${req.model.id}`
    })(req, res, next);
  });

  app.post('/confirm', (req, res, next) => {
    return res.redirect(`${req.buildRoute('place.delete')}/success`);
  });

  app.use('/success', success({
    model: 'place',
    licence: 'pel',
    type: 'amendment',
    status: 'resubmitted'
  }));

  return app;
};
