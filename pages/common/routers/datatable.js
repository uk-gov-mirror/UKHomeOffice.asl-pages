const { castArray, pick, merge, set, get, omit } = require('lodash');
const { Router } = require('express');
const { parse, stringify } = require('qs');
const { cleanModel, removeQueryParams } = require('../../../lib/utils');

const defaultMiddleware = (req, res, next) => next();

const getLimit = (rows = 10) => {
  rows = parseInt(rows, 10);
  return rows < 1000 ? rows : 1000;
};

const buildQuery = (req, schema) => {
  const { sort, pagination: { limit, offset } } = merge({}, req.datatable);

  const filters = get(req.datatable, 'filters.active');
  let search = get(filters, '*');

  if (Array.isArray(search)) {
    search = search[0];
  }

  if (sort && sort.column) {
    if (schema[sort.column].sort) {
      sort.column = schema[sort.column].sort;
    } else if (schema[sort.column].accessor) {
      sort.column = schema[sort.column].accessor;
    }
  }

  return { sort, limit, offset, filters: omit(filters, '*'), search };
};

module.exports = ({
  configure = defaultMiddleware,
  getApiPath = defaultMiddleware,
  getValues = defaultMiddleware,
  persistQuery = defaultMiddleware,
  locals = defaultMiddleware
} = {}) => ({
  apiPath,
  schema,
  defaultRowCount = 10
} = {}) => {
  const app = Router();

  const _configure = (req, res, next) => {
    req.datatable = req.datatable || {};
    req.datatable.schema = schema;
    return configure(req, res, next);
  };

  const _getApiPath = (req, res, next) => {
    if (apiPath) {
      req.datatable.apiPath = apiPath;
    }
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
      set(req.datatable, 'filters.active', req.query.filters);
    }
    if (typeof req.query.sort === 'object') {
      const { column, ascending } = req.query.sort;
      if (column) {
        req.datatable.sort = {
          column,
          ascending: ascending === 'true'
        };
      }
    }
    let { rows = defaultRowCount, page } = req.query;
    page = parseInt(page, 10) - 1 || 0;
    const limit = getLimit(rows);
    req.datatable.pagination = {
      limit,
      page,
      offset: page * limit
    };
    return persistQuery(req, res, next);
  };

  const _getValues = (req, res, next) => {
    if (req.datatable.disable) {
      return next();
    }

    const query = buildQuery(req, req.datatable.schema);
    const apiPath = castArray(req.datatable.apiPath);

    req.api.apply(null, apiPath.concat(
      merge(apiPath[1] || {}, { query })
    ))
      .then(({ json: { meta, data } }) => {
        if (meta.establishment) {
          res.establishment = meta.establishment;
        }

        set(req.datatable, 'filters.options', meta.filters);
        set(req.datatable, 'pagination.totalCount', meta.total);
        set(req.datatable, 'pagination.count', meta.count);
        set(req.datatable, 'data.rows', data.map(cleanModel));

        if (!data.length && meta.count) {
          const redirect = removeQueryParams(req.originalUrl, ['page', 'rows']);
          res.redirect(redirect);
        }
      })
      .then(() => getValues(req, res, next))
      .catch(next);
  };

  const _locals = (req, res, next) => {
    Object.assign(res.locals, { datatable: pick(req.datatable, ['data', 'pagination', 'sort', 'filters']) });
    Object.assign(res.locals.static, { schema: req.datatable.schema });
    if (res.establishment) {
      Object.assign(res.locals.static, { establishment: res.establishment });
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
