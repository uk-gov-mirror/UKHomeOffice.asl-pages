const { Router } = require('express');
const { pick, get, set, omit } = require('lodash');
const moment = require('moment');
const form = require('../../../../common/routers/form');
const { userCanEndorse } = require('../middleware');
const { getSchema } = require('../schema');
const content = require('../content');
const { render } = require('mustache');
const { getAdditionalEstablishments } = require('../../../helpers/project');

const trim = value => value.split('\n').map(s => s.trim()).join('\n').trim();

function getDeclarationText(props) {
  return trim(render(content.declaration.content, props));
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
    const additionalEstablishments = getAdditionalEstablishments(req.project, req.version);
    if (transferWithReceivingEstablishment(req.task)) {
      req.awerbEstablishments = [get(req.task, 'data.establishment')].concat(additionalEstablishments);
    } else {
      req.awerbEstablishments = [req.project.establishment].concat(additionalEstablishments);
    }

    req.licenceHolder = settings.getLicenceHolder
      ? settings.getLicenceHolder(req)
      : req.model.licenceHolder;

    next();
  });

  app.use((req, res, next) => {
    get(req.task, 'data.meta[awerb-dates]', []).map(awerb => {
      req.model[`awerb-${awerb.id}`] = awerb.date;
    });
    next();
  });

  app.use(userCanEndorse);

  app.use((req, res, next) => {
    const meta = omit(get(req.project, 'openTasks[0].data.meta'), 'comment');
    if (meta) {
      Object.assign(req.model, meta);
      (meta['awerb-dates'] || []).forEach(awerb => set(req.model, `awerb-${awerb.id}`, awerb.date));
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
        req.model.type = type;
        req.model.data = null;
        // if application has previously been approved then this is a resubmission and we can show the inspector ready question
        const isAmendment = req.model.type !== 'application';
        const isAsru = req.user.profile.asruUser;
        const includeAwerb = transferWithReceivingEstablishment(req.task) || res.locals.static.canEndorse;
        const awerbEstablishments = req.awerbEstablishments;
        const isLegacy = req.project.schemaVersion === 0;
        const canBeAwerbExempt = isAmendment && !transferWithReceivingEstablishment(req.task);
        const isEndorsement = get(req.task, 'status') === 'awaiting-endorsement';

        const taskEstablishment = get(req.task, 'data.establishment');
        res.locals.static.establishment = taskEstablishment || req.project.establishment;
        res.locals.static.onBehalfOf = !isEndorsement && (req.licenceHolder.id !== req.user.profile.id);
        res.locals.static.isEndorsement = res.locals.static.canEndorse || isEndorsement;
        res.locals.static.licenceHolder = `${req.licenceHolder.firstName} ${req.licenceHolder.lastName}`;
        res.locals.static.type = req.model.type;

        req.processAwerbDates = includeAwerb && !isLegacy;
        req.form.schema = getSchema({
          isLegacy,
          isAmendment,
          isAsru,
          includeAwerb,
          canBeAwerbExempt,
          awerbEstablishments,
          omitCommentsField: settings.omitCommentsField
        });
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
        if (res.locals.static.isEndorsement) {
          req.session.form[req.model.id].meta.declaration = getDeclarationText(res.locals.static);
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
        res.locals.static.project = req.project;
        next();
      }
    })
  );

  return app;
};
