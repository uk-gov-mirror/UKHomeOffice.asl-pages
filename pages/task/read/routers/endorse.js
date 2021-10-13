const { Router } = require('express');
const { get, omit } = require('lodash');
const endorse = require('../../../project-version/update/endorse/routers/endorse');
const endorseContent = require('../../../project-version/update/endorse/content');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use((req, res, next) => {
    const meta = omit(get(req.task, 'data.meta', {}), 'comment');
    Object.assign(req.model, meta);
    next();
  });

  app.use((req, res, next) => {
    const modelId = req.task.data.id;
    const licenceHolderId = get(req.session, `form[${modelId}].values.licenceHolderId`);
    const licenceHolder = req.task.data.licenceHolder;
    if (!licenceHolderId || licenceHolderId === licenceHolder.id) {
      req.licenceHolder = licenceHolder;
      return next();
    }

    const establishmentId = req.task.data.establishmentId;

    req.api(`/establishment/${establishmentId}/profiles/${licenceHolderId}`)
      .then(({ json: { data } }) => {
        req.licenceHolder = data;
      })
      .then(() => next())
      .catch(next);
  });

  app.use(endorse({
    omitCommentsField: true,
    getLicenceHolder: req => req.licenceHolder
  }));

  app.use((req, res, next) => {
    const values = req.session.form[req.model.id].values;
    if (values.status && values.status === 'updated') {
      // use submission content if resubmimssion
      Object.assign(res.locals.static.content, endorseContent);
    }
    res.locals.static.task = req.task;
    next();
  });

  app.post('/', (req, res, next) => {
    const session = req.session.form[`${req.model.id}`];
    if (session.returnTo) {
      const modelId = req.task.data.id;
      Object.assign(req.session.form[modelId].meta, session.meta);
      req.session.form[modelId].values.status = session.values.status;
      // preserve http method
      return res.redirect(307, session.returnTo);
    }
    next();
  });

  app.post('/', (req, res, next) => {
    const { values, meta } = req.session.form[req.model.id];

    const opts = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      json: {
        data: {
          status: 'endorsed',
          ...values
        },
        meta
      }
    };

    return req.api(`/tasks/${req.task.id}/status`, opts)
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect('success');
      })
      .catch(next);
  });

  return app;
};
