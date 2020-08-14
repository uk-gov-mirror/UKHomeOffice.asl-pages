const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Check course details',
  notifications: {
    success: 'Training course updated successfully.'
  }
});
