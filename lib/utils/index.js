const { get, isEqual, mapValues, isPlainObject } = require('lodash');
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

const hasChanged = ({ accessor }, newValue, oldValue) => {
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

module.exports = {
  toTitleCase,
  getTitle,
  getValue,
  hasChanged,
  cleanModel
};
