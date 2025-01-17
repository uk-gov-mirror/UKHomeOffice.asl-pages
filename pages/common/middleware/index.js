const isUUID = require('uuid-validate');
const { get, set } = require('lodash');
const { NotFoundError } = require('@asl/service/errors');

const hydrate = () => (req, res, next) => {
  const task = get(req.model, 'openTasks[0]');

  const shouldHydrate = task &&
    task.editable &&
    !get(req.session, `form.${req.model.id}.hydrated`);

  if (shouldHydrate) {
    const { data, meta } = task.data;
    const taskId = task.id;
    set(req.session, `form.${req.model.id}`, {
      values: {
        ...data,
        ...meta
      },
      taskId,
      hydrated: true
    });
  }
  next();
};

const updateDataFromTask = updateModel => (req, res, next) => {
  const taskId = get(req.session, `form.${req.model.id}.taskId`);
  if (taskId) {
    const taskValues = get(req.session, `form.${taskId}`, {});
    if (!taskValues.returnTo) {
      return next();
    }
    delete taskValues.returnTo;
    const comment = get(taskValues, 'values.comment');
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

const redirectToTaskIfOpen = () => (req, res, next) => {
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
      .then(() => res.redirect(req.buildRoute('task.read', { taskId, suffix: 'confirm' })))
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
  if (req.establishment) {
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
  }
  next();
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
  validateUuidParam
};
