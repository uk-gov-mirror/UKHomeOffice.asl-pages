const { castArray, pick, merge, set, get, omit, mapValues } = require('lodash');
const { Router } = require('express');
const { parse, stringify } = require('qs');
const csv = require('csv-stringify');
const { cleanModel, removeQueryParams } = require('../../../lib/utils');

const defaultMiddleware = (req, res, next) => next();

const getLimit = (rows = 10) => {
  return parseInt(rows, 10);
};

const buildQuery = (req, schema) => {
  const { sort, pagination: { limit, offset } } = merge({}, req.datatable);

  const filters = get(req.datatable, 'filters.active');
  let search = get(filters, '*');

  if (Array.isArray(search)) {
    search = search[0];
  }

  if (sort && sort.column && schema[sort.column]) {
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
  setPagination = defaultMiddleware,
  getApiPath = defaultMiddleware,
  getValues = defaultMiddleware,
  persistQuery = defaultMiddleware,
  locals = defaultMiddleware,
  errorHandler = (err, req, res, next) => next(err)
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

  const _setPagination = (req, res, next) => {
    req.query = req.query || {};
    if (req.datatable.pagination === false || req.query.csv) {
      req.query.rows = 1e4; // bump limit to 10k rows
      req.query.page = 1;
      req.datatable.pagination = { hideUI: true };
    }
    return setPagination(req, res, next);
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
    req.datatable.pagination = merge({}, req.datatable.pagination, {
      limit,
      page,
      offset: page * limit
    });
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
      })
      .then(() => {
        if (!req.datatable.data.rows.length && req.datatable.pagination.count) {
          const redirect = removeQueryParams(req.originalUrl, ['page', 'rows']);
          return res.redirect(redirect);
        }
        getValues(req, res, next);
      })
      .catch(next);
  };

  const _locals = (req, res, next) => {
    Object.assign(res.locals, { datatable: pick(req.datatable, ['data', 'pagination', 'sort', 'filters', 'schema']) });
    if (res.establishment) {
      res.locals.static.establishment = merge({}, res.locals.static.establishment, res.establishment);
    }
    return locals(req, res, next);
  };

  const _sendCSV = (req, res, next) => {
    if (!req.query.csv) {
      return next();
    }
    res.attachment(req.query.csv.filename || 'data.csv');
    const schema = res.locals.datatable.schema;
    const stringifier = csv({
      bom: true,
      header: true,
      cast: {
        string: (value) => {
          if (value && /[0-9]+/.test(value) && !value.includes('"') && !value.includes(',') && !value.includes('\n')) {
            return { value: `="${value}"`, quote: false };
          } else {
            return value;
          }
        }
      },
      columns: Object.keys(schema)
        .filter(key => !schema[key].omitFromCSV)
        .map(key => ({ key, header: schema[key].title || key }))
    });
    stringifier.pipe(res);
    res.locals.datatable.data.rows
      .map(row => {
        return mapValues(schema, (opts, key) => {
          const accessor = opts.accessor || key;
          const value = get(row, accessor);
          if (typeof opts.toCSVString === 'function') {
            return opts.toCSVString(value, row);
          }
          return value;
        });
      })
      .forEach(row => stringifier.write(row));
    stringifier.end();
  };

  app.get('/',
    _configure,
    _setPagination,
    _getApiPath,
    _persistQuery,
    _getValues,
    _locals,
    _sendCSV
  );

  app.use(errorHandler);

  return app;
};
