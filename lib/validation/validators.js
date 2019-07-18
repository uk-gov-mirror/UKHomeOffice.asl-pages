const { isUndefined, isNull, every } = require('lodash');
const moment = require('moment');

const validators = {
  type: (field, type) => {
    if (isUndefined(field) || isNull(field)) {
      return true;
    }
    switch (type) {
      case 'array':
        return Array.isArray(field);
      case 'object':
        return !Array.isArray(field) && typeof field === 'object';
      case 'number':
        return typeof field === 'number';
      case 'string':
        return typeof field === 'string';
    }
    return false;
  },
  required: field => {
    if (Array.isArray(field)) {
      return !!field.length;
    }
    return field !== null && field !== '' && !isUndefined(field);
  },
  customValidate(field, condition, values, model) {
    return !!condition(field, values, model);
  },
  minLength: (field, length) => {
    return isNull(field) ||
      (!isUndefined(field) && field.length >= length);
  },
  maxLength: (field, length) => {
    return isNull(field) ||
      (!isUndefined(field) && field.length <= length);
  },
  match: (field, regex) => {
    return !!(field.match && field.match(regex));
  },
  matchesField: (field, matchField, values) => {
    return field === values[matchField];
  },
  definedValues: (field, definedValues) => {
    if (Array.isArray(field)) {
      return every(field, val => definedValues.includes(val));
    }
    return definedValues.includes(field);
  },
  validDate: date => {
    if (!date.match(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/)) {
      return false;
    }
    return isNull(date) || moment(date, 'YYYY-MM-DD').isValid();
  },
  dateIsBefore(date, isBefore) {
    return isNull(date) || moment(date, 'YYYY-MM-DD').isBefore(isBefore);
  },
  dateIsAfter(date, isAfter) {
    return isNull(date) || moment(date, 'YYYY-MM-DD').isAfter(isAfter);
  },
  // file validation
  fileRequired(files) {
    return !!files.length;
  },
  maxSize(files, size = 5e+6) {
    return every(files, file => file.size < size);
  },
  mimeType(files, type) {
    return every(files, file => file.mimetype === type);
  },
  ext(files, ext) {
    const ra = new RegExp(`\\.${ext}$`);
    return every(files, file => file.originalname.match(ra));
  }
};

module.exports = validators;
