const { get } = require('lodash');

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
  switch (typeof schema.accessor) {
    case 'function':
      return schema.accessor(row);
    case 'string':
      return get(row, schema.accessor);
    case 'undefined':
      return row[key];
  }
};

module.exports = {
  toTitleCase,
  getTitle,
  getValue
};
