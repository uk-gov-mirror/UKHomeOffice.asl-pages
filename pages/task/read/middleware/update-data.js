const { get, set } = require('lodash');

module.exports = (req, res, next) => {
  const params = {
    ...req.task.data,
    ...req.task.data.data
  };

  let model = get(req.task, 'data.model');
  let id = get(req.task, 'data.id');
  let action = get(req.task, 'data.action');

  if (model === 'project' && action === 'grant') {
    return req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/fork`, { method: 'POST' })
      .then(({ json: { data } }) => {
        req.versionId = data.data.id;
        res.redirect(req.buildRoute('project.version.update'));
      })
      .catch(next);
  }

  if (action === 'grant') {
    action = 'update';
  }

  if (model === 'profile') {
    model = 'account';
  }

  if (id) {
    params[`${model}Id`] = id;
  } else {
    set(req.session, `form.new-${model}`, {
      taskId: req.task.id,
      values: {
        ...req.task.data.data,
        ...req.task.data.meta
      }
    });
  }

  return res.redirect(req.buildRoute(`${model}.${action}`, params));
};
