const { Router } = require('express');
const { get, uniq } = require('lodash');
const form = require('../../common/routers/form');
const { getSchema } = require('../schema');
const { hydrate } = require('../../common/middleware');

module.exports = () => {

  const app = Router();

  app.get('/', hydrate());

  app.use(form({
    checkChanged: true,
    configure: (req, res, next) => {
      req.form.schema = getSchema(req.establishment);
      next();
    },
    process: (req, res, next) => {
      let nacwos = get(req.body, 'nacwos');
      let nvssqps = get(req.body, 'nvssqps');
      req.form.values.nacwos = uniq(Array.isArray(nacwos) ? nacwos : [nacwos]);
      req.form.values.nvssqps = uniq(Array.isArray(nvssqps) ? nvssqps : [nvssqps]);
      next();
    },
    cancelEdit: (req, res, next) => {
      return res.redirect(req.buildRoute('place.list'));
    },
    locals: (req, res, next) => {
      res.locals.static.values = req.place;
      next();
    }
  }));

  return app;
};
