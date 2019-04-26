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

const licenceCanProgress = decision => {
  return [
    'ntco-endorsed',
    'inspector-recommended',
    'resolved'
  ].includes(decision);
};

const requiresDeclaration = decision => {
  return [
    'ntco-endorsed'
  ].includes(decision);
};

const normalise = str => {
  return str.toLowerCase().split(' ').join('-').replace(/[^a-z0-9]+/g, '');
};

const traverse = (node, key, keys) => {
  if (key) keys.push(key);
  if (node instanceof Array) {
    node.forEach(o => {
      traverse(o, `${key}${o.id ? `.${o.id}` : ''}`, keys);
    });
  } else if (node instanceof Object) {
    Object.keys(node).forEach(k => {
      traverse(node[k], `${key ? `${key}.` : ''}${k}`, keys);
    });
  }
  return keys;
};

const getNode = (tree, path) => {
  const uuid4 = '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4{1}[a-fA-F0-9]{3}-[89abAB]{1}[a-fA-F0-9]{3}-[a-fA-F0-9]{12}$';
  let keys = path.split('.');
  let node = tree[keys[0]];
  for (var i = 1; i < keys.length; i++) {
    let parent = node;
    if (keys[i].match(uuid4)) {
      if (parent instanceof Array) {
        node = parent.find(o => o.id === keys[i]);
      }
    } else node = parent[keys[i]];
  }
  return node;
};

module.exports = {
  toTitleCase,
  normalise,
  getTitle,
  getValue,
  getSort,
  hasChanged,
  cleanModel,
  removeQueryParams,
  toArray,
  buildModel,
  licenceCanProgress,
  requiresDeclaration,
  traverse,
  getNode
};
