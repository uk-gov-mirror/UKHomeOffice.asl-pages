const { pick, concat } = require('lodash');
const { page } = require('@asl/service/ui');
const { baseSchema } = require('../schema');
const confirm = require('../routers/confirm');
const form = require('../../common/routers/form');
const success = require('../../success');

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
      const schema = baseSchema();
      res.locals.model = pick(req.model, Object.keys(schema), 'tasks');
      res.locals.static = res.locals.static || {};
      res.locals.static.schema = schema;

      const allNacwos = req.establishment.nacwo;
      const allNvsSqps = concat(req.establishment.nvs, req.establishment.sqp);

      // convert role ids into role objects with profile for the model summary
      res.locals.model.nacwos = allNacwos.filter(r => res.locals.model.nacwos.includes(r.id));
      res.locals.model.nvssqps = allNvsSqps.filter(r => res.locals.model.nvssqps.includes(r.id));

      return next();
    },
    cancelEdit: (req, res, next) => {
      return res.redirect(req.buildRoute('place.list'));
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('place.delete', { suffix: 'confirm' }));
  });

  app.use('/confirm', (req, res, next) => {
    confirm({
      page: 'place.delete',
      method: 'DELETE',
      apiUrl: `/establishment/${req.establishmentId}/place/${req.model.id}`
    })(req, res, next);
  });

  app.post('/confirm', (req, res, next) => {
    return res.redirect(req.buildRoute('place.delete', { suffix: 'success' }));
  });

  app.use('/success', success());

  return app;
};
