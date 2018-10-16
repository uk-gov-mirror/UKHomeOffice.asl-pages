module.exports = {
  model: state => state || {},
  datatable: require('./datatable'),
  static: (state = {}) => state
};
