module.exports = {
  contactName: {
    inputType: 'inputText',
    validate: ['required']
  },
  contactNumber: {
    inputType: 'inputText',
    validate: ['required']
  },
  contactEmail: {
    inputType: 'inputText',
    validate: ['required']
  },
  contactAddress: {
    inputType: 'textarea',
    validate: ['required']
  },
  hasPurchaseOrder: {
    inputType: 'radioGroup',
    automapReveals: true,
    validate: ['required'],
    options: [
      {
        value: 'yes',
        reveal: {
          purchaseOrder: {
            inputType: 'inputText',
            validate: ['required']
          }
        }
      },
      {
        value: 'no',
        reveal: {
          alternativePaymentMethod: {
            inputType: 'textarea',
            validate: ['required']
          }
        }
      }
    ]
  },
  otherInformation: {
    inputType: 'textarea'
  },
  declaredCurrent: {
    inputType: 'declaration',
    title: 'Confirm that all details are up to date',
    validate: ['required']
  }
};
