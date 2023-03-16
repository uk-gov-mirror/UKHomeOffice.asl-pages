const isUUID = require('uuid-validate');
const { get, set, omit } = require('lodash');
const { NotFoundError } = require('@asl/service/errors');
const loadPermissions = require('./load-permissions');
const enforcementFlags = require('./enforcement-flags');
const { cleanModel } = require('../../../lib/utils');

const hydrate = () => async (req, res, next) => {
  const task = get(req.model, 'openTasks[0]');

  const shouldHydrate = task &&
    task.editable &&
    !get(req.session, `form.${req.model.id}.hydrated`);

  // Because we use the autocomplete for the PEL & NPRC the data saves and hydrates differently,
  // so we have to get the details from the ID and also delete the unused one
  if (task && task.data.model === 'establishment' && task.data.action === 'update') {
    if (task.data.data.nprc) {
      task.data.meta.nprc = await getUserInfo(task.data.data.nprc, req);
      delete task.data.meta.pelh;
    }
    if (task.data.data.pelh) {
      task.data.meta.pelh = await getUserInfo(task.data.data.pelh, req);
      delete task.data.meta.nprc;
    }
  }

  if (shouldHydrate) {
    const { data, meta } = task.data;
    const taskId = task.id;
    set(req.session, `form.${req.model.id}`, {
      values: {
        ...data,
        ...omit(meta, 'comment') // comment is per task status change
      },
      taskId,
      hydrated: true
    });
  }
  next();
};

const getUserInfo = (profileId, req) => {
  return req.api(`/establishment/${req.establishmentId}/profile/${profileId}`)
    .then(({ json: { data } }) => {
      const model = cleanModel(data);
      return {
        id: profileId,
        firstName: model.firstName,
        lastName: model.lastName
      };
    });
};

const updateDataFromTask = updateModel => (req, res, next) => {
  const taskId = get(req.session, `form.${req.model.id}.taskId`);
  if (taskId) {
    const taskValues = get(req.session, `form.${taskId}`, {});
    if (!taskValues.returnTo) {
      return next();
    }
    delete taskValues.returnTo;
    const comment = get(taskValues, 'meta.comment');
    return updateModel(req, { status: 'updated', taskId, meta: { comment } })
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('task.read', { taskId, suffix: 'success' }));
      })
      .catch(next);
  }
  next();
};

const redirectToTaskIfOpen = (shouldRedirect = () => true, settings = {}) => (req, res, next) => {
  if (shouldRedirect && !shouldRedirect(req)) {
    return next();
  }
  const taskId = get(req.session, `form.${req.model.id}.taskId`);
  if (taskId) {
    // check task is not stale
    return req.api(`/task/${taskId}`)
      .then(() => {
        set(req.session, `form.${taskId}`, {
          values: {
            status: 'updated'
          },
          returnTo: req.baseUrl
        });
      })
      .then(() => {
        const suffix = settings.getSuffix
          ? settings.getSuffix(req)
          : 'confirm';
        return res.redirect(req.buildRoute('task.read', { taskId, suffix }));
      })
      // task doesn't exist, continue;
      .catch(() => next());
  }
  next();
};

const clearSessionIfNotFromTask = () => (req, res, next) => {
  const referrer = req.get('Referrer');
  const taskId = get(req.session, `form.${req.model.id}.taskId`);
  // taskId is set to the session for new-{model}
  // when coming from an open task
  if (taskId && (!referrer || !referrer.match(/\/tasks\//))) {
    set(req.session, `form.${req.model.id}`, {});
  }
  next();
};

const populateNamedPeople = (req, res, next) => {
  if (!req.establishment) {
    return next();
  }
  return Promise.resolve()
    .then(() => {
      if (!req.establishment.roles) {
        return req.api(`/establishment/${req.establishment.id}/named-people`)
          .then(result => {
            const roles = result.json.data;
            req.establishment.roles = roles;
          })
          .catch(next);
      }
    })
    .then(() => {
      req.establishment.roles = req.establishment.roles || [];
      const pelh = req.establishment.roles.find(r => r.type === 'pelh');
      const nprc = req.establishment.roles.find(r => r.type === 'nprc');

      if (pelh) {
        req.establishment.pelh = pelh.profile;
      }
      if (nprc && (!pelh || nprc.profile.id !== pelh.profile.id)) {
        req.establishment.nprc = nprc.profile;
      }

      ['holc', 'nacwo', 'nio', 'nvs', 'ntco', 'sqp'].map(roleName => {
        req.establishment[roleName] = req.establishment.roles.filter(r => r.type === roleName);
      });
      next();
    });
};

const populateEstablishmentProfiles = (req, res, next) => {
  if (!req.establishment || req.establishment.profiles) {
    return next();
  }

  return req.api(`/establishment/${req.establishmentId}/profiles`, { query: { limit: 'all' } })
    .then(({ json: { data } }) => {
      req.establishment.profiles = data;
      next();
    })
    .catch(next);
};

const validateUuidParam = () => (req, res, next, param) => {
  if (!isUUID(param)) {
    return next(new NotFoundError());
  }
  next();
};

module.exports = {
  hydrate,
  updateDataFromTask,
  redirectToTaskIfOpen,
  clearSessionIfNotFromTask,
  populateNamedPeople,
  populateEstablishmentProfiles,
  validateUuidParam,
  loadPermissions,
  enforcementFlags
};
