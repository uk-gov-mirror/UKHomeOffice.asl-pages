const form = require('../../common/routers/form');
const { getSchemaWithNacwos } = require('../schema');
const { getNacwoById } = require('../../common/helpers');

module.exports = settings => form(Object.assign({
  model: 'place',
  configure: (req, res, next) => {
    getSchemaWithNacwos(req)
      .then(schema => {
        req.form.schema = schema;
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
  }
}, settings));
