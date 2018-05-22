const csv = require('csv-stringify');
const { chain, get } = require('lodash');
const { applyFilters } = require('../reducers/filters');

const flatten = (row, schema) => {
  return chain(row)
    .pick(Object.keys(schema))
    .mapValues((val, key) => get(row, schema[key].accessor || key))
    .mapValues(val => Array.isArray(val) ? val.join() : val)
    .value();
};

const formatDataForCsv = (data, schema) => data.map(r => flatten(r, schema));

module.exports = () => (req, res, next) => {
  if (res.template && req.query.format === 'csv') {
    const { list: { data, schema }, filters } = res.store.getState();
    if (data) {
      res.type('application/csv');
      res.attachment(`${res.template}.csv`);
      return csv(formatDataForCsv(applyFilters({ data, filters, schema }), schema), { header: true })
        .pipe(res)
        .on('error', next);
    }
    throw new Error('CSV rendering is not suported for this page');
  }
  next();
};
