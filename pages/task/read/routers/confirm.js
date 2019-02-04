const form = require('../../../common/routers/form');
const { Router } = require('express');
const { set, get, pick } = require('lodash');
const schemaGenerator = require('../../schema');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.breadcrumb('task.confirm');
    req.model = { id: `${req.task.id}-confirm` };
    next();
  });

  app.use(form({
    locals: (req, res, next) => {
      const values = get(req, `session.form[${req.task.id}-decision].values`);

      const schema = schemaGenerator(req.task);

      if (req.task.data.model === 'place') {
        schema.restrictions = {};
      }

      set(res, 'locals.static', {
        ...res.locals.static,
        modelSchema: schema,
        task: req.task,
        values
      });

      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const values = req.session.form[`${req.task.id}-decision`].values;

    const params = {
      ...pick(values, 'status'),
      meta: pick(values, 'comment', 'restrictions')
    }

    const opts = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(params)
    };

    return req.api(`/tasks/${req.task.id}/status`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('task.success', { taskId: req.task.id }));
  });

  return app;
};
