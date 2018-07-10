const { castArray } = require('lodash');
const { Router } = require('express');
const { parse, stringify } = require('qs');
const { cleanModel } = require('../../../lib/utils');

const defaultMiddleware = (req, res, next) => next();

module.exports = ({
  configure = defaultMiddleware,
  getApiPath = defaultMiddleware,
  getValues = defaultMiddleware,
  persistQuery = defaultMiddleware,
  locals = defaultMiddleware
} = {}) => ({
  apiPath,
  schema
}) => {
  const app = Router();

  const _configure = (req, res, next) => {
    req.datatable = req.datatable || {};
    return configure(req, res, next);
  };

  const _getApiPath = (req, res, next) => {
    req.datatable.apiPath = apiPath;
    return getApiPath(req, res, next);
  };

  const _persistQuery = (req, res, next) => {
    if (req.query.props) {
      const props = parse(req.query.props);
      props.filters = Object.keys(req.query).reduce((filters, key) => {
        const match = key.match(/^filter-(.+)$/);
        if (match) {
          filters[match[1]] = [].concat(req.query[key]);
        }
        return filters;
      }, {});
      return res.redirect(`?${stringify(props)}`);
    }

    if (typeof req.query.filters === 'object') {
      req.datatable.filters = req.query.filters;
    }
    if (typeof req.query.sort === 'object') {
      const { column, ascending } = req.query.sort;
      req.datatable.sort = {
        column,
        ascending: ascending === 'true'
      };
    }
    return persistQuery(req, res, next);
  };

  const _getValues = (req, res, next) => {
    req.api.apply(null, castArray(req.datatable.apiPath))
      .then(({ json: { meta, data } }) => {
        if (meta) {
          req.datatable.establishment = meta.establishment;
        }
        req.datatable.data = data.map(cleanModel);
      })
      .then(() => getValues(req, res, next))
      .catch(next);
  };

  const _locals = (req, res, next) => {
    Object.assign(res.locals, { datatable: req.datatable });
    Object.assign(res.locals.static, { schema });
    if (req.datatable.establishment) {
      Object.assign(res.locals.static, { establishment: req.datatable.establishment });
    }
    return locals(req, res, next);
  };

  app.get('/',
    _configure,
    _getApiPath,
    _persistQuery,
    _getValues,
    _locals
  );

  return app;
};
