const { Router } = require('express');
const { merge } = require('lodash');
const form = require('./form');
const confirm = require('./confirm');
const success = require('./success');
const schema = require('../schema');
const mapSchema = require('../middleware/map-schema');
const getEstablishment = require('../../common/middleware/get-establishment');
const getNacwos = require('../helpers/get-nacwos');

module.exports = settings => {
  const app = Router();

  app.use('/', form({
    configure: mapSchema({ schema })
  })({ model: 'place' }));

  app.post('/', (req, res, next) => {
    return res.redirect(`${req.baseUrl}/confirm`);
  });

  app.get('/', (req, res, next) => {
    const { values, validationErrors, schema } = req.form;
    res.locals.static.errors = validationErrors;
    res.locals.static.schema = schema;
    getNacwos(req)
      .then(nacwos => {
        res.locals.item = {
          ...values,
          nacwo: nacwos.find(n => n.id === values.nacwo)
        };
      })
      .then(() => next())
      .catch(next);
  });

  app.use('/confirm', confirm({
    getValues: (req, res, next) => {
      getNacwos(req)
        .then(nacwos => {
          merge(req.form.diff, {
            nacwo: {
              newValue: nacwos.find(n => n.id === req.form.diff.nacwo.newValue)
            }
          });
        })
        .then(() => next())
        .catch(next);
    },
    locals: getEstablishment()
  })({ model: 'place', schema }));

  app.use('/success', success({ model: 'place' }));

  return app;
};
