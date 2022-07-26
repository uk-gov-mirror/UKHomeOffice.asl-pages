const dateFormatter = require('date-fns/format');
const differenceInDays = require('date-fns/difference_in_days');
const { get, isEqual, mapValues, isPlainObject, omit, castArray, reduce, isUndefined } = require('lodash');
const { parse } = require('url');
const qs = require('qs');
const striptags = require('striptags');
const { dateFormat } = require('../../constants');

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
  if (!oldValue && !newValue) {
    return false;
  }
  if (Array.isArray(newValue)) {
    newValue = [ ...newValue ].map(v => get(v, accessor, v)).sort();
    oldValue = [ ...oldValue ].map(v => get(v, accessor, v)).sort();
    return !isEqual(oldValue, newValue);
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

const toBoolean = val => {
  if (val === 'false') {
    return false;
  }
  return !!val;
};

const buildModel = (...args) => {
  return Object.assign(
    ...args.map(schema => {
      return reduce(schema, (fields, { nullValue, reveal }, key) => {
        return {
          ...fields,
          ...(reveal ? buildModel(reveal) : { [key]: isUndefined(nullValue) ? null : nullValue })
        };
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

const normalise = str => {
  return str.toLowerCase().split(' ').join('-').replace(/[^a-z0-9]+/g, '');
};

const canUpdateModel = ({ openTasks = [] }) =>
  !openTasks.length ||
  openTasks[0].editable;

const canTransferPil = ({ pil, user }) => {
  return Promise.resolve()
    .then(() => {
      if (pil.status !== 'active') {
        return false;
      }

      const hasOpenAmendment = pil.status === 'active' && get(pil, 'openTasks[0].data.action') === 'grant';

      if (hasOpenAmendment) {
        return false;
      }

      return user.can('pil.transfer', { pilId: pil.id });
    });
};

const formatDate = (date, format = dateFormat.medium) => date ? dateFormatter(date, format) : '-';

const daysSinceDate = (date, from = new Date()) => differenceInDays(from, date);

const numberWithCommas = x => {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const isDeadlineExtension = (item) => {
  const extensionFlag = 'event.meta.payload.data.deadline.isExtended';
  const bcExtensionFlag = 'event.meta.payload.data.extended';
  return get(item, extensionFlag) || get(item, bcExtensionFlag, false);
};

const isDeadlineRemove = (item) => {
  const isRemoved = 'event.meta.payload.meta.isRemoved';
  return get(item, isRemoved);
};

const isDeadlineReinstate = (item) => {
  const isReinstate = 'event.meta.payload.meta.isReinstate';
  return get(item, isReinstate);
};

function isTrueish(val) {
  const yeps = [
    'yes',
    'Yes',
    true,
    1
  ];
  return yeps.includes(val);
}

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
  toBoolean,
  buildModel,
  licenceCanProgress,
  formatDate,
  daysSinceDate,
  canUpdateModel,
  canTransferPil,
  numberWithCommas,
  isDeadlineExtension,
  isDeadlineRemove,
  isDeadlineReinstate,
  isTrueish
};
