const { merge } = require('lodash');
const { Router } = require('express');
const addOrEdit = require('../../common/routers/add-or-edit');
const { schema, getSchemaWithNacwos } = require('../schema');
const { getEstablishment, getNacwoById } = require('../../common/helpers');

module.exports = settings => {
  const app = Router();

  app.use(addOrEdit(merge({
    schema,
    model: 'place',
    formSettings: {
      configure: (req, res, next) => {
        getSchemaWithNacwos(req)
          .then(schema => {
            req.form.schema = schema;
          })
          .then(() => next())
          .catch(next);
      },
      locals: (req, res, next) => {
        getNacwoById(req, res.locals.model.nacwo)
          .then(nacwo => {
            res.locals.model.nacwo = nacwo;
          })
          .then(() => next())
          .catch(next);
      }
    },
    confirmSettings: {
      locals: (req, res, next) => {
        Promise.all([
          getNacwoById(req, req.form.values.nacwo),
          getEstablishment(req)
        ])
          .then(([nacwo, establishment]) => {
            Object.assign(res.locals.static, {
              establishment,
              values: {
                ...res.locals.static.values,
                nacwo
              }
            });
          })
          .then(() => next())
          .catch(next);
      }
    }
  }, settings)));

  return app;
};
