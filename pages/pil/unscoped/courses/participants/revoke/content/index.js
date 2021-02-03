module.exports = {
  title: 'Revoke category E licence',
  summary: 'If {{name}} has a category A, B, C, D or F personal licence, only the category E will be removed.',
  fields: {
    comments: {
      label: 'Remarks (optional)',
      hint: 'Your remarks will be recorded and visible to relevant establishment and Home Office staff.'
    }
  },
  buttons: {
    submit: 'Continue'
  },
  errors: {
    comments: {
      required: 'Tell us why you are revoking this licence'
    }
  }
};
