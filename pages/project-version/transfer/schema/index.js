module.exports = establishments => ({
  establishment: {
    inputType: 'select',
    options: establishments.map(e => ({ label: e.name, value: e.id }))
  }
});
