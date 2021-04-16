module.exports = {
  title: 'Downloads',
  licence: {
    inactive: {
      heading: 'Licence preview',
      link: 'Licence preview: {{title}} (.pdf)',
      hint: 'Download a preview of how the licence will appear if granted. This doesn\'t include any restrictions the Home Office may add.',
      back: 'Back to draft licence'
    },
    active: {
      heading: 'Licence',
      link: 'Licence: {{title}} (.pdf)',
      hint: 'Download the official licence for this project.',
      back: 'Back to licence'
    },
    granted: { // Linking to the active licence when amend in progress
      heading: 'Granted licence',
      link: 'Granted licence: {{title}} (.pdf)',
      hint: 'Download the official licence for this project.'
    },
    expired: {
      heading: 'Expired licence',
      link: 'Expired licence: {{title}} (.pdf)',
      hint: 'Download the expired licence for this project.',
      back: 'Back to expired licence'
    },
    revoked: {
      heading: 'Revoked licence',
      link: 'Revoked licence: {{title}} (.pdf)',
      hint: 'Download the revoked licence for this project.',
      back: 'Back to revoked licence'
    },
    transferred: {
      heading: 'Transferred licence',
      link: 'Transferred licence: {{title}} (.pdf)',
      hint: 'Download the transferred licence for this project.',
      back: 'Back to transferred licence'
    }
  },
  application: {
    heading: 'Application',
    link: 'Full application (.docx)',
    'pdf-link': 'Full application (.pdf)',
    hint: 'Download the full application, including background information and justification not detailed in the licence.'
  },
  amendment: {
    heading: 'Amendment',
    link: 'Amendment (.docx)',
    'pdf-link': 'Amendment (.pdf)',
    hint: 'Download the full amendment, including background information and justification not detailed in the licence.'
  },
  template: {
    heading: 'Template',
    link: 'Template (.ppl)',
    hint: 'Download a copy of the application data that can be used as a template for similar projects. The file can be uploaded to avoid creating new applications from scratch.'
  },
  nts: {
    heading: 'Non-technical summary',
    link: 'Non-technical summary (.pdf)',
    hint: 'Download the project\'s non-technical summary.'
  },
  protocols: {
    heading: 'Protocols',
    link: 'Steps and adverse effects (.pdf)',
    hint: 'Download a table of each protocol’s steps, adverse effects, controls and limitations, and humane endpoints.'
  }
};
