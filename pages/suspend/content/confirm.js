const { merge } = require('lodash');
const baseContent = require('.');

module.exports = merge({}, baseContent, {
  suspend: {
    title: 'Confirm {{licenceType}} licence suspension',
    reason: 'Reason for suspending this licence',
    warning: {
      pil: `The licence holder will not be authorised to carry out regulated procedures in the categories stated in this
      licence until the licence is reinstated.`,
      project: `Regulated procedures will not be authorised to be carried out under this licence.`,
      establishment: `The establishment will not be authorised to apply regulated procedures to protected animals, or to
      breed, supply, or keep protected animals in any approved area until the licence is reinstated.`
    },
    buttons: {
      submit: 'Confirm suspension'
    }
  },
  reinstate: {
    title: 'Confirm {{licenceType}} licence reinstatement',
    reason: 'Reason for reinstating this licence',
    warning: {
      pil: `The licence holder will be authorised to carry out regulated procedures in the categories stated in this licence.`,
      project: `Regulated procedures will be authorised to be carried out under this licence.`,
      establishment: `The establishment will be authorised to apply regulated procedures to protected animals, or to
      breed, supply, or keep protected animals in any approved area at the establishment.`
    },
    buttons: {
      submit: 'Confirm reinstatement'
    }
  }
});
