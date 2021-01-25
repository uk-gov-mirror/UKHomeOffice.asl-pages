const { pick } = require('lodash');

module.exports = includeAwerb => {
  const schema = {
    comment: {
      inputType: 'textarea'
    },
    'ra-awerb-date': {
      inputType: 'inputDate',
      validate: ['required']
    }
  };

  return includeAwerb
    ? pick(schema, 'ra-awerb-date', 'comment')
    : pick(schema, 'comment');
};
