const { get, omit, merge } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../../common/routers');
const { clearSessionIfNotFromTask, populateNamedPeople } = require('../../../common/middleware');
const getSchema = require('./schema');
const confirm = require('../../routers/confirm');
const success = require('../../routers/success');
const { profileReplaced, PELH_OR_NPRC_ROLES } = require('../../helper');
const mandatoryTrainingRequirments = require('../components/content/index');
const sendData = (req, params = {}) => {
  const { type, rcvsNumber, comment } = req.session.form[req.model.id].values;

  const replaceProfile = profileReplaced(req.establishment, type);
  const opts = {
    method: 'POST',
    json: merge({
      data: { type, rcvsNumber, profileId: req.profileId, replaceProfile, replaceRoles: PELH_OR_NPRC_ROLES },
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
      id: `${req.profile.id}-new-role-named-person`
    };
    next();
  });

  app.get('/', clearSessionIfNotFromTask());

  app.use('/', (req, res, next) => {
    const query = {
      model: 'establishment',
      modelId: req.establishmentId,
      onlyOpen: true,
      action: 'replace'
    };
    req.api('/tasks/related', { query })
      .then((response) => {
        return response.json.data || [];
      })
      .then(data => {
        res.locals.static.pelhOrNprcTasks = data
          .filter(task => PELH_OR_NPRC_ROLES.includes(task.data.data.type))
          .map(task => ({
            id: task.id,
            type: task.data.data.type
          }));
        next();
      })
      .catch(next);
  });

  app.use('/', form({
    configure: (req, res, next) => {
      const rolesHeld = req.profile.roles
        .filter(role => role.establishmentId === req.establishmentId)
        .map(role => role.type);

      const addRoleTasks = req.profile.openTasks
        .filter(task => task.data.model === 'role' && (task.data.action === 'create'))
        .map(task => ({
          id: task.id,
          type: task.data.data.type
        }));

      const pelOrNprcTasks = res.locals.static.pelhOrNprcTasks;
      const rolesRequested = addRoleTasks.map(task => task.type).concat(pelOrNprcTasks.length > 0 ? PELH_OR_NPRC_ROLES : []);

      req.form.schema = {
        ...getSchema(rolesHeld.concat(rolesRequested), req.establishment),
        rcvsNumber: {}
      };

      res.locals.static.addRoleTasks = addRoleTasks.concat(pelOrNprcTasks);
      req.model.openTasks = []; // hide the open tasks warning on role forms as it is not applicable

      next();
    },
    getValues: (req, res, next) => {
      req.form.values.rcvsNumber = req.form.values.rcvsNumber || req.profile.rcvsNumber;
      next();
    },
    locals: (req, res, next) => {
      res.locals.static.schema = omit(req.form.schema, 'rcvsNumber');
      res.locals.static.ownProfile = req.user.profile.id === req.profileId;
      res.locals.pageTitle = `${res.locals.static.content.title} - ${req.establishment.name}`;
      next();
    },
    saveValues: (req, res, next) => {
      req.session.form[req.model.id].values = req.form.values;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const { type } = req.session.form[req.model.id].values;
    const rolesWithRequirements = Object.keys(mandatoryTrainingRequirments);
    if (rolesWithRequirements.includes(type)) {
      return res.redirect(req.buildRoute('role.namedPersonMvp.mandatoryTraining'));
    }

    return res.redirect(req.buildRoute('role.create', { suffix: 'confirm' }));
  });

  app.use('/confirm', populateNamedPeople, confirm({
    action: 'create',
    sendData
  }));

  app.post('/confirm', populateNamedPeople, (req, res, next) => {
    sendData(req)
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('role.create', { suffix: 'success' }));
      })
      .catch(next);
  });

  app.use('/success', success());

  return app;
};
