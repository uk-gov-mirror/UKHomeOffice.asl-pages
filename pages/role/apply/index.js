const { get, omit, merge } = require('lodash');
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
      const rolesHeld = req.profile.roles
        .filter(role => role.establishmentId === req.establishmentId)
        .map(role => role.type);

      const addRoleTasks = req.profile.openTasks
        .filter(task => task.data.model === 'role' && task.data.action === 'create')
        .map(task => ({
          id: task.id,
          type: task.data.data.type
        }));

      const rolesRequested = addRoleTasks.map(task => task.type);

      req.form.schema = {
        ...getSchema(rolesHeld.concat(rolesRequested)),
        rcvsNumber: {}
      };

      res.locals.static.addRoleTasks = addRoleTasks;
      req.model.openTasks = []; // hide the open tasks warning on role forms as it is not applicable

      next();
    },
    locals: (req, res, next) => {
      res.locals.static.schema = omit(req.form.schema, 'rcvsNumber');
      res.locals.static.ownProfile = req.user.profile.id === req.profileId;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('role.create', { suffix: 'confirm' }));
  });

  app.use('/confirm', confirm({
    action: 'create',
    sendData
  }));

  app.post('/confirm', (req, res, next) => {
    sendData(req)
      .then(response => {
        delete req.session.form[req.model.id];
        req.session.success = {
          taskId: get(response, 'json.data.id')
        };
        return res.redirect(req.buildRoute('role.create', { suffix: 'success' }));
      })
      .catch(next);
  });

  app.use('/success', success());

  return app;
};
