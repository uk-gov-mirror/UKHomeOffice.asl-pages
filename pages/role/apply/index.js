const { omit, merge } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const { clearSessionIfNotFromTask } = require('../../common/middleware');
const getSchema = require('./schema');
const confirm = require('../routers/confirm');
const success = require('../routers/success');

const sendData = (req, params = {}) => {
  const { type, rcvsNumber, comment } = req.session.form[req.model.id].values;

  const opts = {
    method: 'POST',
    json: merge({
      data: { type, rcvsNumber, profileId: req.profileId },
      meta: { comment }
    }, params)
  };

  return req.api(`/establishment/${req.establishmentId}/role`, opts);
};

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings,
    paths: ['/confirm', '/success']
  });

  app.use((req, res, next) => {
    req.model = {
      id: 'new-role'
    };
    next();
  });

  app.get('/', clearSessionIfNotFromTask());

  app.use('/', form({
    configure: (req, res, next) => {
      const roles = req.profile.roles.map(role => role.type);
      req.form.schema = {
        ...getSchema(roles),
        rcvsNumber: {}
      };
      next();
    },
    locals: (req, res, next) => {
      res.locals.static.schema = omit(req.form.schema, 'rcvsNumber');
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('role.create', { suffix: 'confirm' }));
  });

  app.use('/confirm', confirm({
    type: 'create',
    sendData
  }));

  app.post('/confirm', (req, res, next) => {
    sendData(req)
      .then(() => res.redirect(req.buildRoute('role.create', { suffix: 'success' })))
      .catch(next);
  });

  app.use('/success', success());

  return app;
};
