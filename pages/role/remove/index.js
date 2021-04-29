const { difference, get } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const getSchema = require('./schema');
const confirm = require('../routers/confirm');
const success = require('../routers/success');

const sendData = (req) => {
  const { type, comment } = req.session.form[req.model.id].values;
  const roleId = req.profile.roles.find(r => r.type === type && r.establishmentId === req.establishmentId).id;

  const opts = {
    method: 'DELETE',
    json: {
      data: { profileId: req.profileId },
      meta: { comment }
    }
  };

  return req.api(`/establishment/${req.establishmentId}/role/${roleId}`, opts);
};

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings,
    paths: ['/confirm', '/success']
  });

  app.use('/', form({
    configure: (req, res, next) => {
      const rolesHeld = req.profile.roles
        .filter(role => role.establishmentId === req.establishmentId)
        .map(role => role.type);

      const removeRoleTasks = req.profile.openTasks
        .filter(task => task.data.model === 'role' && task.data.action === 'delete')
        .filter(task => get(task, 'data.modelData.type'))
        .map(task => ({
          id: task.id,
          type: task.data.modelData.type
        }));

      const rolesBeingRemoved = removeRoleTasks.map(task => task.type);

      req.form.schema = {
        ...getSchema(difference(rolesHeld, rolesBeingRemoved))
      };

      res.locals.static.removeRoleTasks = removeRoleTasks;
      req.model.openTasks = []; // hide the open tasks warning on role forms as it is not applicable

      next();
    },
    locals: (req, res, next) => {
      res.locals.static.schema = req.form.schema;
      res.locals.pageTitle = `${res.locals.static.content.title} - ${req.establishment.name}`;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('role.delete', { suffix: 'confirm' }));
  });

  app.use('/confirm', confirm({
    action: 'delete',
    sendData
  }));

  app.post('/confirm', (req, res, next) => {
    sendData(req)
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('role.delete', { suffix: 'success' }));
      })
      .catch(next);
  });

  app.use('/success', success());

  return app;
};
