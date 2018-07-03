const form = require('../../common/routers/form');
const { getSchemaWithNacwos, schema } = require('../schema');
const { getNacwoById } = require('../../common/helpers');

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
  locals: (req, res, next) => {
    res.locals.static.schema = req.form.schema;
    getNacwoById(req, req.form.values.nacwo)
      .then(nacwo => {
        res.locals.model.nacwo = nacwo;
      })
      .then(() => next())
      .catch(next);
  },
  cancelEdit: (req, res, next) => {
    return res.redirect(req.listPath);
  }
}, settings));
