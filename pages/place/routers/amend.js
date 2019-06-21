const form = require('../../common/routers/form');
const { getSchemaWithNacwos, schema } = require('../schema');

module.exports = settings => form(Object.assign({
  model: 'place',
  checkChanged: true,
  configure: (req, res, next) => {
    getSchemaWithNacwos(req, settings.schema || schema)
      .then(mappedSchema => {
        req.form.schema = mappedSchema;
      })
      .then(() => next())
      .catch(next);
  },
  cancelEdit: (req, res, next) => {
    return res.redirect(req.buildRoute('place.list'));
  }
}, settings));
