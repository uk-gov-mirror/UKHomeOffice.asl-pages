const form = require('../../../common/routers/form');
const { Router } = require('express');
const { set, get, pick } = require('lodash');
const { render } = require('mustache');
const moment = require('moment');
const getSchema = require('../../schema/confirm');
const content = require('../content/confirm');
const askAwerb = require('../../helper/ask-awerb');

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

const transferWithReceivingEstablishment = task => {
  const isTransfer = get(task, 'data.action') === 'transfer';
  const isAwaitingEndorsement = get(task, 'status') === 'awaiting-endorsement';
  const isWithReceivingEstablishment = get(task, 'data.data.establishmentId') === get(task, 'data.establishmentId');
  return isTransfer && isAwaitingEndorsement && isWithReceivingEstablishment;
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
    if (req.project) {
      const isLegacy = req.project.schemaVersion === 0;
      req.askAwerb = askAwerb(req.task, status);
      req.processAwerbDates = req.askAwerb && !isLegacy;

      if (transferWithReceivingEstablishment(req.task)) {
        req.awerbEstablishments = [get(req.task, 'data.establishment')].concat(req.project.additionalEstablishments);
      } else {
        req.awerbEstablishments = [req.project.establishment].concat(req.project.additionalEstablishments);
      }

      get(req.task, 'data.meta[awerb-dates]', []).map(awerb => {
        req.model[`awerb-${awerb.id}`] = awerb.date;
      });
    }
    next();
  });

  app.use(form({
    configure: (req, res, next) => {
      const chosenStatus = get(req, `session.form[${req.task.id}].values.status`);
      res.locals.static.commentRequired = req.task.nextSteps.find(s => s.id === chosenStatus).commentRequired;
      res.locals.static.commentLabel = content.commentLabels[chosenStatus];
      const awerbEstablishments = req.awerbEstablishments;
      const isLegacy = req.project && req.project.schemaVersion === 0;
      req.schema = getSchema({ task: req.task, chosenStatus, isLegacy, awerbEstablishments });
      req.form.schema = req.schema;
      next();
    },
    process: (req, res, next) => {
      if (req.askAwerb && req.processAwerbDates && req.form.values['awerb-exempt'] !== 'yes') {
        req.awerbEstablishments.forEach(e => {
          req.form.values[`awerb-${e.id}`] = `${req.body[`awerb-${e.id}-year`]}-${req.body[`awerb-${e.id}-month`]}-${req.body[`awerb-${e.id}-day`]}`;
        });
      }
      next();
    },
    saveValues: (req, res, next) => {
      if (req.askAwerb && req.processAwerbDates && req.form.values['awerb-exempt'] !== 'yes') {
        const primaryEstablishment = req.project.establishment;
        req.session.form[req.model.id].values['awerb-dates'] = req.awerbEstablishments.map(e => {
          return { ...pick(e, 'id', 'name'), date: moment(req.form.values[`awerb-${e.id}`], 'YYYY-MM-DD').format('YYYY-MM-DD'), primary: e.id === primaryEstablishment.id };
        });
      }
      next();
    },
    locals: (req, res, next) => {
      const values = get(req, `session.form[${req.model.id}].values`);

      if (req.askAwerb) {
        // map the error content to the per-establishment date fields
        req.awerbEstablishments.forEach(e => {
          set(res.locals, `static.content.errors.awerb-${e.id}`, content.errors['awerb-dates']);
        });
      }

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
    const values = req.session.form[req.model.id].values;

    const opts = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      json: {
        status: values.status,
        data: values.data,
        meta: {
          ...values.meta,
          ...pick(values, 'comment', 'restrictions', 'awerb', 'awerb-exempt', 'awerb-dates', 'awerb-review-date', 'awerb-no-review-reason', 'deadline-passed-reason', 'ra-awerb-date', 'declaration')
        }
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
