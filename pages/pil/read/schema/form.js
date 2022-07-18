module.exports = {
  conditions: {
    inputType: 'textarea'
  },
  setReminder: {
    label: '',
    inputType: 'checkboxGroup',
    automapReveals: true,
    className: 'smaller',
    options: [
      {
        label: 'Set a reminder for deadlines associated with this condition',
        value: 'yes',
        reveal: {
          deadline: {
            inputType: 'inputDate',
            label: 'Condition deadline',
            hint: 'Licence holders will receive reminders a month before, a week before and on the day the condition is due to be met. ASRU will receive a reminder when the deadline has passed.',
            validate: [
              'required',
              'validDate',
              { dateIsAfter: 'now' }
            ]
          }
        }
      }
    ]
  }
};
