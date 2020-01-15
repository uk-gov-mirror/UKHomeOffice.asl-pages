const moment = require('moment');

module.exports = {
  newIssueDate: {
    inputType: 'inputDate',
    validate: ['required', 'validDate', { dateIsBefore: moment().endOf('day') }]
  }
};
