const { Router } = require('express');
const { omit, pick, merge } = require('lodash');
const form = require('../../common/routers/form');
const { getEstablishment, getNacwoById } = require('../../common/helpers');
const { schema } = require('../schema');
const declarationsSchema = require('../schema/declarations');
const { updateDataFromTask, redirectToTaskIfOpen } = require('../../common/middleware');

module.exports = settings => {

  const sendData = (req, params = {}) => {
    const values = req.session.form[req.model.id].values;
    const opts = {
      method: settings.method,
      json: merge({
        data: omit(values, 'comments', 'comment', 'establishmentId', 'changesToRestrictions'),
        meta: {
          ...pick(values, 'comments', 'changesToRestrictions')
        }
      }, params)
    };

    return req.api(settings.apiUrl, opts);
  };

  const app = Router();

  app.post('/', updateDataFromTask(sendData));

  app.use(form(Object.assign({
    model: 'place',
    schema: declarationsSchema,
    saveValues: (req, res, next) => {
      delete req.session.form[req.model.id].values.declarations;
      next();
    },
    locals: (req, res, next) => {
      Object.assign(res.locals, { model: req.model });
      Promise.all([
        getEstablishment(req),
        getNacwoById(req, req.form.values.nacwo)
      ])
        .then(([establishment, nacwo]) => {
          Object.assign(res.locals.static, {
            establishment,
            schema: Object.assign({}, schema, declarationsSchema),
            values: {
              ...req.session.form[req.model.id].values,
              nacwo
            }
          });
        })
        .then(() => next())
        .catch(next);
    },
    checkSession: (req, res, next) => {
      if (req.session.form && req.session.form[req.model.id]) {
        return next();
      }
      return res.redirect(req.originalUrl.replace(/\/confirm/, ''));
    },
    editAnswers: (req, res, next) => {
      delete req.session.form[req.model.id].validationErrors;
      return res.redirect(req.baseUrl.replace(/\/confirm/, ''));
    },
    cancelEdit: (req, res, next) => {
      return res.redirect(req.buildRoute('place.list'));
    }
  }, settings)));

  app.post('/', redirectToTaskIfOpen());

  app.post('/', (req, res, next) => {
    sendData(req)
      .then(() => next())
      .catch(next);
  });

  return app;
};
