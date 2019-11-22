const { get, set } = require('lodash');

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
      .then(() => delete req.session.form[req.model.id])
      .then(() => res.redirect(req.buildRoute('task.read', { taskId, suffix: 'success' })))
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

module.exports = {
  hydrate,
  updateDataFromTask,
  redirectToTaskIfOpen,
  clearSessionIfNotFromTask
};
