const { Router } = require('express');
const { get, set } = require('lodash');
const form = require('../../common/routers/form');
const { getSchemaWithNacwos, schema } = require('../schema');
const { hydrate } = require('../../common/middleware');

module.exports = () => {

  const app = Router();

  app.get('/', hydrate());

  app.use(form({
    checkChanged: true,
    configure: (req, res, next) => {
      getSchemaWithNacwos(req, schema)
        .then(mappedSchema => {
          req.form.schema = mappedSchema;
        })
        .then(() => next())
        .catch(next);
    },
    getValues: (req, res, next) => {
      const nacwo = get(req.form, 'values.nacwo');
      if (nacwo && typeof nacwo === 'object') {
        set(req.form, 'values.nacwo', nacwo.id);
      }
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
