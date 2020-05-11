const { Router } = require('express');
const { get, uniq } = require('lodash');
const form = require('../../common/routers/form');
const { getSchemaWithNacwos, schema } = require('../schema');
const { hydrate } = require('../../common/middleware');

module.exports = () => {

  const app = Router();

  app.get('/', hydrate());

  app.use(form({
    checkChanged: true,
    configure: (req, res, next) => {
      req.form.schema = getSchemaWithNacwos(req, schema);
      next();
    },
    process: (req, res, next) => {
      let nacwos = get(req.body, 'nacwos');
      req.form.values.nacwos = uniq(Array.isArray(nacwos) ? nacwos : [nacwos]);
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
