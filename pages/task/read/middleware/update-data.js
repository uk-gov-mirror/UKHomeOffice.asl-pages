const { get, set } = require('lodash');

module.exports = (req, res, next) => {
  const params = {
    ...req.task.data,
    ...req.task.data.data
  };

  let model = get(req.task, 'data.model');
  let id = get(req.task, 'data.id');
  let action = get(req.task, 'data.action');

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

  if (model === 'project') {
    if (action === 'grant') {
      model = 'projectVersion';
      action = 'update';
      params.versionId = req.project.draft.id;
    } else if (action === 'update') {
      action = 'updateLicenceHolder';
    }
  } else if (action === 'grant') {
    action = 'update';
  }

  return res.redirect(req.buildRoute(`${model}.${action}`, params));
};
