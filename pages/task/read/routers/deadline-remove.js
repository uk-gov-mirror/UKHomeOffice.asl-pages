const { Router } = require('express');
const { set, get, pick } = require('lodash');
const form = require('../../../common/routers/form');
const schema = require('../../schema/extend');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.model = { id: req.task.id };
    next();
  });

  app.use(form({
    schema,
    locals: (req, res, next) => {
      set(res, 'locals.static', {
        ...res.locals.static,
        task: req.task,
        values: get(req, `session.form[${req.task.id}].values`)
      });

      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const values = req.session.form[`${req.task.id}`].values;

    const params = {
      meta: pick(values, 'comment')
    };

    const opts = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(params)
    };

    return req.api(`/tasks/${req.task.id}/remove-deadline`, opts)
      .then(() => {
        delete req.session.form[`${req.task.id}`];
      })
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('task.read'));
  });

  return app;
};
