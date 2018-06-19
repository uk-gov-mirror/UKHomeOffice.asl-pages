const { Router } = require('express');
const edit = require('../../common/routers/edit');
const schema = require('../schema');
const mapSchema = require('../helpers/map-schema');
const { getEstablishment, getNacwoById } = require('../../common/helpers');

module.exports = settings => {

  const app = Router();

  app.use('/', edit({
    model: 'place',
    schema,
    formSettings: {
      configure: mapSchema({ schema }),
      locals: (req, res, next) => {
        getNacwoById(req, res.locals.item.nacwo)
          .then(nacwo => {
            res.locals.nacwo = nacwo;
          })
          .then(() => next())
          .catch(next);
      }
    },
    confirmSettings: {
      getValues: (req, res, next) => {
        getNacwoById(req, req.form.diff.nacwo.newValue)
          .then(nacwo => {
            req.form.diff.nacwo.newValue = nacwo;
          })
          .then(() => next())
          .catch(next);
      },
      locals: (req, res, next) => {
        getEstablishment(req)
          .then(establishment => {
            res.locals.static.establishment = establishment;
          })
          .then(() => next())
          .catch(next);
      }
    }
  }));

  return app;
};
