const { Router } = require('express');
const { get, uniq, merge } = require('lodash');
const form = require('../../common/routers/form');
const { getSchema } = require('../schema');
const { hydrate } = require('../../common/middleware');

module.exports = () => {

  const app = Router();

  app.get('/', hydrate());

  app.use(form({
    checkChanged: true,
    configure: (req, res, next) => {
      req.api(`/search/establishment/${req.establishmentId}/places`)
        .then(response => {
          const filters = response.json.meta.filters;
          req.form.schema = getSchema({
            establishment: req.establishment,
            sites: filters.find(f => f.key === 'site').values,
            areas: filters.find(f => f.key === 'area').values
          });
        })
        .then(() => next())
        .catch(next);
    },
    getValues: (req, res, next) => {
      merge(req.form.schema, {
        site: {
          defaultValue: req.form.values.site
        },
        area: {
          defaultValue: req.form.values.area
        }
      });
      next();
    },
    process: (req, res, next) => {
      let nacwos = get(req.body, 'nacwos');
      let nvssqps = get(req.body, 'nvssqps');
      req.form.values.nacwos = uniq(Array.isArray(nacwos) ? nacwos : [nacwos]).filter(Boolean);
      req.form.values.nvssqps = uniq(Array.isArray(nvssqps) ? nvssqps : [nvssqps]).filter(Boolean);

      // if user does not click "Done" on restrictions then the value is posted twice as an array
      if (Array.isArray(req.body.restrictions)) {
        req.form.values.restrictions = req.body.restrictions[0];
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
