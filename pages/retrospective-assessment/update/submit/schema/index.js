const { pick } = require('lodash');

module.exports = (includeAwerb, awerbCompleted) => {
  const schema = {
    comment: {
      inputType: 'textarea'
    },
    'ra-awerb-date': {
      inputType: 'inputDate',
      validate: ['required']
    }
  };

  return includeAwerb && !awerbCompleted
    ? pick(schema, 'ra-awerb-date', 'comment')
    : pick(schema, 'comment');
};
