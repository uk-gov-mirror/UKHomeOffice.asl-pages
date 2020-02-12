module.exports = {
  title: 'Download options',
  licence: {
    inactive: {
      heading: 'Draft licence',
      link: 'Draft licence: {{title}} (.pdf)',
      hint: 'Download a preview of how the licence will appear if granted. This doesn\'t include any restrictions the Home Office may add.',
      back: 'Back to draft licence'
    },
    active: {
      heading: 'Licence',
      link: 'Licence: {{title}} (.pdf)',
      hint: 'Download the official licence for this project.',
      back: 'Back to licence'
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
    }
  },
  application: {
    heading: 'Application',
    link: 'Full application (.docx)',
    hint: 'Download the full application, including background information and justification not detailed in the licence.'
  }
};
