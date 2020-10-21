const { get, intersection } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const { submit } = require('../middleware');
const getSchema = require('./schema');

const SPECIES_MODULES = [
  'PILA (theory)',
  'PILA (skills)',
  'K (skills)'
];

module.exports = () => {
  const app = page({ root: __dirname });

  app.use(form({
    configure(req, res, next) {
      const isExemption = get(req.session, `form[${req.model.id}].values.isExemption`);
      req.form.schema = getSchema(isExemption);
      next();
    },
    locals(req, res, next) {
      res.locals.static.isExemption = get(req.session, `form[${req.model.id}].values.isExemption`);
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const { modules } = req.form.values;
    if (intersection(modules, SPECIES_MODULES).length) {
      return res.redirect(req.buildRoute(`${res.locals.static.basePage}.species`));
    }
    return next();
  });

  app.post('/', submit());

  return app;
};
