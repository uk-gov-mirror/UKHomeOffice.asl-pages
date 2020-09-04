const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  fields: {
    comments: {
      label: 'Why are you removing this approved area?'
    }
  },
  pages: {
    place: {
      delete: 'Remove approved area'
    }
  },
  buttons: {
    submit: 'Continue'
  }
});
