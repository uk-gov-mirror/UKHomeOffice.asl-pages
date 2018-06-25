const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  pages: {
    place: {
      delete: 'Remove premises'
    }
  }
});
