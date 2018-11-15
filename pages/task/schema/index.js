module.exports = {
  approve: {
    inputType: 'radioGroup',
    options: [
      {
        value: 'yes',
        label: 'Yes'
      },
      {
        value: 'no',
        label: 'No',
        reveal: {
          notes: {
            inputType: 'textarea',
            validate: [{
              customValidate: (field, model) => {
                // when no is selected, the user must provide a reason
                return (model.approve && model.approve === 'no') ? !!field : true;
              }
            }]
          }
        }
      }
    ],
    nullValue: [],
    validate: [
      'required',
      {
        definedValues: ['yes', 'no']
      }
    ]
  }
};
