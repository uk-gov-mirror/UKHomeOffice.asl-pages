const { toBoolean } = require('../../../../../lib/utils');

module.exports = (profile) => {
  return {
    type: {
      inputType: 'radioGroup',
      format: toBoolean,
      options: [
        {
          label: `Yes, I am ready to nominate ${profile.firstName} for a role`,
          value: true
        },
        {
          label: `No, I need to view or update ${profile.firstName}'s training record`,
          value: false
        }
      ],
      validate: ['required']
    }
  };
};
