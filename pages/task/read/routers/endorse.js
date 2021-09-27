const { Router } = require('express');
const { get } = require('lodash');
const endorse = require('../../../project-version/update/endorse/routers/endorse');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use((req, res, next) => {
    const meta = get(req.task, 'data.meta', {});
    Object.assign(req.model, meta);
    next();
  });

  app.use(endorse({ omitCommentsField: true }));

  app.use((req, res, next) => {
    res.locals.static.task = req.task;
    next();
  });

  app.post('/', (req, res, next) => {
    const { values, meta } = req.session.form[req.model.id];

    const opts = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      json: {
        data: values,
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
