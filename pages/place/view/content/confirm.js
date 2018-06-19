const { merge } = require('lodash');
const commonContent = require('../../content');

module.exports = merge({}, commonContent, {
  declaration: 'By submitting this change, I confirm that I also have the consent of the Establishment Licence holder'
});
