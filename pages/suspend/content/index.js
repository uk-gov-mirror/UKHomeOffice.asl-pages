module.exports = {
  suspend: {
    title: 'Suspend {{licenceType}} licence',
    fields: {
      comment: {
        label: 'Why are you suspending this licence?'
      }
    },
    buttons: {
      submit: 'Continue'
    },
    errors: {
      comment: {
        required: 'Tell us why you are suspending this licence'
      }
    }
  },
  reinstate: {
    title: 'Reinstate {{licenceType}} licence',
    fields: {
      comment: {
        label: 'Why are you reinstating this licence?'
      }
    },
    buttons: {
      submit: 'Continue'
    },
    errors: {
      comment: {
        required: 'Tell us why you are reinstating this licence'
      }
    }
  }
};
