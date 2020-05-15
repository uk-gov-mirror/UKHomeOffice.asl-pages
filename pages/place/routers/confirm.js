const { Router } = require('express');
const { omit, pick, merge, get, concat } = require('lodash');
const form = require('../../common/routers/form');
const { schema } = require('../schema');
const { updateDataFromTask, redirectToTaskIfOpen } = require('../../common/middleware');

module.exports = settings => {

  const sendData = (req, params = {}) => {
    const values = req.session.form[req.model.id].values;
    values.roles = concat([], values.nacwos, values.nvssqps);
    const opts = {
      method: settings.method,
      json: merge({
        data: omit(values, 'comments', 'comment', 'establishmentId', 'changesToRestrictions', 'nacwos', 'nvssqps'),
        meta: {
          ...pick(values, 'comments', 'changesToRestrictions')
        }
      }, params)
    };

    return req.api(settings.apiUrl, opts);
  };

  const app = Router();

  app.post('/', updateDataFromTask(sendData));

  app.use(form({
    requiresDeclaration: req => !req.user.profile.asruUser,
    saveValues: (req, res, next) => {
      delete req.session.form[req.model.id].values.declaration;
      next();
    },
    locals: (req, res, next) => {
      const existingNacwoIds = req.model.nacwos;
      const selectedNacwoIds = req.session.form[req.model.id].values.nacwos;

      const existingNvsSqpIds = req.model.nvssqps;
      const selectedNvsSqpIds = req.session.form[req.model.id].values.nvssqps;

      Object.assign(res.locals, {
        model: {
          ...req.model,
          // provide the existing roles for rendering profile names in the lhs of diff
          nacwos: req.establishment.nacwo.filter(r => existingNacwoIds.includes(r.id)),
          nvssqps: req.establishment.roles.filter(r => ['nvs', 'sqp'].includes(r.type) && existingNvsSqpIds.includes(r.id))
        }
      });

      Object.assign(res.locals.static, {
        establishment: req.establishment,
        diffSchema: schema,
        values: {
          ...req.session.form[req.model.id].values,
          // provide the selected roles for rendering profile names in the rhs of diff
          nacwos: req.establishment.nacwo.filter(r => selectedNacwoIds.includes(r.id)),
          nvssqps: req.establishment.roles.filter(r => ['nvs', 'sqp'].includes(r.type) && selectedNvsSqpIds.includes(r.id))
        }
      });

      next();
    },
    checkSession: (req, res, next) => {
      if (req.session.form && req.session.form[req.model.id]) {
        return next();
      }
      return res.redirect(req.buildRoute(settings.page));
    },
    editAnswers: (req, res, next) => {
      delete req.session.form[req.model.id].validationErrors;
      return res.redirect(req.buildRoute(settings.page));
    },
    cancelEdit: (req, res, next) => {
      return res.redirect(req.buildRoute('place.list'));
    }
  }));

  app.post('/', redirectToTaskIfOpen());

  app.post('/', (req, res, next) => {
    sendData(req)
      .then(response => {
        delete req.session.form[req.model.id];
        const status = get(response, 'json.data.status');
        if (status === 'autoresolved') {
          req.notification({ key: 'success' });
          return res.redirect(req.buildRoute('place.list'));
        }
        return next();
      })
      .catch(next);
  });

  return app;
};
