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

  if (model === 'pil' && action === 'transfer') {
    // use the owning establishment id not the receiving establishment id
    params.establishmentId = get(req.task, 'data.data.establishment.from.id');
  }

  if (model === 'project') {
    if (action === 'grant' || action === 'transfer') {
      model = 'projectVersion';
      action = 'update';
      params.establishmentId = req.project.establishmentId;
      params.versionId = req.project.draft.id;
    } else if (action === 'update') {
      action = 'updateLicenceHolder';
    } else if (action === 'grant-ra') {
      model = 'retrospectiveAssessment';
      action = '';
      params.establishmentId = req.project.establishmentId;
      params.raId = req.project.draftRa.id;
    }
  } else if (model === 'pil' && action === 'update-conditions') {
    action = 'read';
  } else if (action === 'grant' || action === 'transfer') {
    action = 'update';
  }

  return res.redirect(req.buildRoute(`${model}${action ? '.' : ''}${action}`, params));
};
