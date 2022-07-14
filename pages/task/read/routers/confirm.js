const form = require('../../../common/routers/form');
const { Router } = require('express');
const { set, get } = require('lodash');
const { render } = require('mustache');
const getSchema = require('../../schema/confirm');
const content = require('../content/confirm');

const requiresDeclaration = (task, values) => {
  const model = task.data.model;
  let action = task.data.action;
  if (action === 'grant' && task.type === 'amendment') {
    action = 'update';
  }
  if (action === 'grant-ra') {
    return false;
  }
  return ['pil', 'trainingPil', 'project'].includes(model) && values.status === 'endorsed' && action !== 'review';
};

const trim = value => value.split('\n').map(s => s.trim()).join('\n').trim();

const getDeclarationText = (task, values) => {
  const declaration = get(content, `declaration.${values.status}.${task.data.model}`);
  const licenceHolder = get(task, 'data.modelData.profile') || get(task, 'data.modelData.licenceHolder');
  return trim(render(declaration, {
    name: `${get(licenceHolder, 'firstName')} ${get(licenceHolder, 'lastName')}`,
    type: task.type
  }));
};

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.model = { id: req.task.id };
    const values = get(req, `session.form[${req.task.id}].values`, {});
    const status = values.status;
    req.requiresDeclaration = requiresDeclaration(req.task, values);
    if (!status || status === req.task.status) {
      return res.redirect(req.buildRoute('task.read'));
    }

    next();
  });

  app.use(form({
    configure: (req, res, next) => {
      const chosenStatus = get(req, `session.form[${req.task.id}].values.status`);
      if (!chosenStatus) {
        return res.redirect(req.buildRoute('task.read'));
      }
      res.locals.static.commentRequired = req.task.nextSteps.find(s => s.id === chosenStatus).commentRequired;
      res.locals.static.commentLabel = content.commentLabels[chosenStatus];
      req.schema = getSchema({ task: req.task, chosenStatus });
      req.form.schema = req.schema;
      next();
    },
    locals: (req, res, next) => {
      const values = get(req, `session.form[${req.model.id}].values`);

      set(res, 'locals.static', {
        ...res.locals.static,
        task: req.task,
        requiresDeclaration: req.requiresDeclaration,
        values
      });

      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const values = req.session.form[`${req.model.id}`];
    if (values.returnTo) {
      // preserve http method
      return res.redirect(307, values.returnTo);
    }
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

    if (req.requiresDeclaration) {
      opts.json.meta.declaration = getDeclarationText(req.task, values);
    }

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
