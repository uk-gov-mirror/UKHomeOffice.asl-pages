const { Router } = require('express');
const { pick, get, set } = require('lodash');
const moment = require('moment');
const form = require('../../../../common/routers/form');
const { getSchema } = require('../schema');
const content = require('../content');
const { render } = require('mustache');

const trim = value => value.split('\n').map(s => s.trim()).join('\n').trim();

function getDeclarationText(version) {
  return trim(render(content.declaration.content, {
    licenceHolder: `${version.licenceHolder.firstName} ${version.licenceHolder.lastName}`,
    type: version.type
  }));
}

const transferWithReceivingEstablishment = task => {
  const isTransfer = get(task, 'data.action') === 'transfer';
  const isAwaitingEndorsement = get(task, 'status') === 'awaiting-endorsement';
  const isWithReceivingEstablishment = get(task, 'data.data.establishmentId') === get(task, 'data.establishmentId');
  return isTransfer && isAwaitingEndorsement && isWithReceivingEstablishment;
};

module.exports = (settings = {}) => {
  const app = Router({ mergeParams: true });

  app.use((req, res, next) => {
    req.awerbEstablishments = [req.project.establishment].concat(req.project.additionalEstablishments);
    if (transferWithReceivingEstablishment(req.task)) {
      req.awerbEstablishments = [get(req.task, 'data.establishment')].concat(req.project.additionalEstablishments);
    } else {
      req.awerbEstablishments = [req.project.establishment].concat(req.project.additionalEstablishments);
    }

    next();
  });

  app.use((req, res, next) => {
    get(req.task, 'data.meta[awerb-dates]', []).map(awerb => {
      req.model[`awerb-${awerb.id}`] = awerb.date;
    });
    next();
  });

  app.use((req, res, next) => {
    const params = {
      projectId: req.project.id,
      establishmentId: req.establishmentId
    };
    req.user.can('project.endorse', params)
      .then(canEndorse => {
        res.locals.static.canEndorse = canEndorse;
      })
      .then(() => next())
      .catch(next);
  });

  app.use((req, res, next) => {
    const declarations = get(req.project, 'openTasks[0].data.meta');
    if (declarations) {
      Object.assign(req.model, declarations);
      (declarations['awerb-dates'] || []).forEach(awerb => set(req.model, `awerb-${awerb.id}`, awerb.date));
    }
    next();
  });

  app.use(
    form({
      configure: (req, res, next) => {
        const existingTask = req.task || get(req.project, 'openTasks[0]');
        let type = req.project.status === 'active' ? 'amendment' : 'application';
        if (existingTask && existingTask.data.action === 'transfer') {
          type = 'transfer request';
        }
        req.version.type = type;
        // if application has previously been approved then this is a resubmission and we can show the inspector ready question
        const hasAuthority = get(existingTask, 'data.meta.authority');
        const isAmendment = req.version.type !== 'application';
        const isAsru = req.user.profile.asruUser;
        const includeReady = hasAuthority && !isAmendment;
        const includeAwerb = transferWithReceivingEstablishment(req.task) || res.locals.static.canEndorse;
        const awerbEstablishments = req.awerbEstablishments;
        const isLegacy = req.project.schemaVersion === 0;
        const canBeAwerbExempt = isAmendment && !transferWithReceivingEstablishment(req.task);

        req.processAwerbDates = includeAwerb && !isLegacy;
        req.form.schema = getSchema({ isLegacy, isAmendment, isAsru, includeReady, includeAwerb, canBeAwerbExempt, awerbEstablishments, omitCommentsField: settings.omitCommentsField });
        next();
      },
      process: (req, res, next) => {
        if (req.processAwerbDates && req.form.values['awerb-exempt'] !== true) {
          req.awerbEstablishments.forEach(e => {
            req.form.values[`awerb-${e.id}`] = `${req.body[`awerb-${e.id}-year`]}-${req.body[`awerb-${e.id}-month`]}-${req.body[`awerb-${e.id}-day`]}`;
          });
        }
        next();
      },
      saveValues: (req, res, next) => {
        if (req.processAwerbDates && req.form.values['awerb-exempt'] !== true) {
          const primaryEstablishment = req.project.establishment;
          req.session.form[req.model.id].meta['awerb-dates'] = req.awerbEstablishments.map(e => {
            return { ...pick(e, 'id', 'name'), date: moment(req.form.values[`awerb-${e.id}`], 'YYYY-MM-DD').format('YYYY-MM-DD'), primary: e.id === primaryEstablishment.id };
          });
        }
        if (res.locals.static.canEndorse) {
          req.session.form[req.model.id].meta.declaration = getDeclarationText(req.version);
        }
        if (transferWithReceivingEstablishment(req.task)) {
          req.session.form[req.model.id].meta['awerb-exempt'] = false; // receiving establishment for transfers can never be 'awerb-exempt'
        }
        next();
      },
      locals: (req, res, next) => {
        // map the error content to the per-establishment date fields
        req.awerbEstablishments.forEach(e => {
          set(res.locals, `static.content.errors.awerb-${e.id}`, content.errors['awerb-dates']);
        });
        const licenceHolder = req.version.licenceHolder;
        res.locals.static.licenceHolder = `${licenceHolder.firstName} ${licenceHolder.lastName}`;
        res.locals.static.type = req.version.type;
        res.locals.static.version = req.version;
        res.locals.static.isApplication = req.version.type === 'application';
        next();
      }
    })
  );

  return app;
};
