const { isUndefined, isNull, every, castArray, some } = require('lodash');
const moment = require('moment');

const validators = {
  type: (field, value, type) => {
    if (isUndefined(value) || isNull(value)) {
      return true;
    }
    switch (type) {
      case 'array':
        return Array.isArray(value);
      case 'object':
        return !Array.isArray(value) && typeof value === 'object';
      case 'number':
        return typeof value === 'number' && !Number.isNaN(value);
      case 'string':
        return typeof value === 'string';
    }
    return false;
  },
  required: (field, value, params, values, model) => {
    if (params && params.valFromModel && !value) {
      value = model[field];
    }
    if (Array.isArray(value)) {
      return !!value.length;
    }
    return value !== null && value !== '' && !isUndefined(value);
  },
  customValidate: (field, value, condition, values, model) => {
    return !!condition(value, values, model);
  },
  email: (field, value) => {
    return value.match(/[a-z0-9.]+@[a-z0-9.]+/i);
  },
  minLength: (field, value, length) => {
    return isNull(value) ||
      (!isUndefined(value) && value.length >= length);
  },
  maxLength: (field, value, length) => {
    return !value || `${value}`.length <= length;
  },
  match: (field, value, regex) => {
    return !!(value.match && value.match(regex));
  },
  matchesField: (field, value, matchField, values) => {
    return value === values[matchField];
  },
  definedValues: (field, value, definedValues) => {
    if (value === undefined) {
      return true;
    }
    if (Array.isArray(value)) {
      return every(value, val => definedValues.includes(val));
    }
    return definedValues.includes(value);
  },
  validDate: (field, value) => {
    if (!value.match(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/)) {
      return false;
    }
    return isNull(value) || moment(value, 'YYYY-MM-DD').isValid();
  },
  dateIsBefore(field, value, isBefore) {
    if (typeof isBefore === 'function') {
      isBefore = isBefore();
    }
    if (isBefore === 'now') {
      isBefore = moment();
    }
    return isNull(value) || moment(value, 'YYYY-MM-DD').isBefore(isBefore);
  },
  lessThanOrEqualToMaxWordCount(fieldName, value, params, values, model, field) {
    return value?.split(/\s+/).filter(Boolean).length <= field.maxWordCount;
  },
  dateIsAfter(field, value, isAfter) {
    if (typeof isAfter === 'function') {
      isAfter = isAfter();
    }
    if (isAfter === 'now') {
      isAfter = moment();
    }
    return isNull(value) || moment(value, 'YYYY-MM-DD').isAfter(isAfter);
  },
  // file validation
  fileRequired(field, value) {
    return !!(value && value.length);
  },
  // 5MB
  maxSize(field, value, size = 5e+6) {
    return every(value, file => file.size < size);
  },
  mimeType(field, value, types) {
    return every(value, file => castArray(types).includes(file.mimetype));
  },
  ext(field, value, ext) {
    if (Array.isArray(ext)) {
      return some(ext, e => validators.ext(field, value, e));
    }
    const ra = new RegExp(`\\.${ext}$`);
    return every(value, file => file.originalname.match(ra));
  }
};

module.exports = validators;
