module.exports = {
  ropHeader: {
    title: 'Return of procedures {{year}}'
  },
  subtitle: 'Submit nil return',
  reason: '**Reason for nil return:** {{^noProcs}}No postnatal or free feeding animals used.{{/noProcs}}{{#noProcs}}No procedures completed in {{year}}{{/noProcs}}',
  buttons: {
    submit: 'Submit nil return'
  }
};
