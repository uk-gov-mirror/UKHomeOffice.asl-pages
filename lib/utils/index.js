const { get, isEqual, mapValues, isPlainObject, omit, castArray, reduce, isUndefined } = require('lodash');
const { parse } = require('url');
const qs = require('qs');
const striptags = require('striptags');

const toTitleCase = str =>
  str.replace(/\w\S*/g, txt => `${txt.charAt(0).toUpperCase()}${txt.substr(1)}`);

const getTitle = (key, options = {}) => {
  if (options.title) {
    if (typeof options.title === 'function') {
      return options.title(key);
    }
    return options.title;
  }
  return toTitleCase(key);
};

const getValue = ({ row, schema, key }) => {
  const accessor = schema.accessor || key;
  if (typeof accessor === 'function') {
    return accessor(row);
  }
  return get(row, accessor);
};

const hasChanged = (newValue, oldValue, { accessor } = {}) => {
  oldValue = get(oldValue, accessor, oldValue);
  newValue = get(newValue, accessor, newValue);
  if (Array.isArray(newValue)) {
    return !isEqual([ ...oldValue ].sort(), [ ...newValue ].sort());
  }
  return !isEqual(oldValue, newValue);
};

const cleanModel = item => {
  if (typeof item === 'string') {
    return striptags(item);
  }
  if (isPlainObject(item)) {
    return mapValues(item, cleanModel);
  }
  if (Array.isArray(item)) {
    return item.map(cleanModel);
  }
  return item;
};

const removeQueryParams = (url, params) => {
  const u = parse(url);
  const query = qs.parse(u.query);
  u.search = qs.stringify(omit(query, castArray(params)));
  return u.format();
};

const getSort = (column, state) => ({
  column,
  ascending: state.column === column ? !state.ascending : true
});

const toArray = val => {
  if (!val) {
    return [];
  }
  return castArray(val);
};

const buildModel = (...args) => {
  return Object.assign(
    ...args.map(schema => {
      return reduce(schema, (fields, { nullValue }, key) => {
        return { ...fields, [key]: isUndefined(nullValue) ? null : nullValue };
      }, {});
    })
  );

};

module.exports = {
  toTitleCase,
  getTitle,
  getValue,
  getSort,
  hasChanged,
  cleanModel,
  removeQueryParams,
  toArray,
  buildModel
};
