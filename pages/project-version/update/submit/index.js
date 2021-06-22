const { pick, get, set } = require('lodash');
const moment = require('moment');
const { page } = require('@asl/service/ui');
const form = require('../../../common/routers/form');
const { getSchema } = require('./schema');
const content = require('./content');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.version.type = req.project.status === 'active' ? 'amendment' : 'application';
    req.awerbEstablishments = [req.project.establishment].concat(req.project.additionalEstablishments);
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
      Object.assign(req.version, pick(declarations, [
        'authority',
        'ready',
        'authority-pelholder-name',
        'authority-endorsement-date',
        'awerb',
        'awerb-review-date',
        'awerb-exempt',
        'awerb-dates',
        'awerb-no-review-reason',
        'comments'
      ]));
      (declarations['awerb-dates'] || []).forEach(awerb => set(req.version, `awerb-${awerb.id}`, awerb.date));
    }
    next();
  });

  app.use((req, res, next) => {
    req.model = {
      ...req.version,
      data: pick(req.version.data, 'title')
    };
    next();
  });

  app.use(
    form({
      configure: (req, res, next) => {
        const existingTask = get(req.project, 'openTasks[0]');
        // if application has previously been approved then this is a resubmission and we can show the inspector ready question
        const hasAuthority = get(existingTask, 'data.meta.authority') === 'Yes';
        const isAmendment = req.version.type === 'amendment';
        const isAsru = req.user.profile.asruUser;
        const includeReady = hasAuthority && !isAmendment;
        const includeAwerb = res.locals.static.canEndorse;
        const awerbEstablishments = req.awerbEstablishments;
        const isLegacy = req.project.schemaVersion === 0;
        req.processAwerbDates = includeAwerb && !isLegacy;
        req.form.schema = getSchema({ isLegacy, isAmendment, isAsru, includeReady, includeAwerb, awerbEstablishments });
        next();
      },
      process: (req, res, next) => {
        if (req.processAwerbDates && req.form.values['awerb-exempt'] !== 'yes') {
          req.awerbEstablishments.forEach(e => {
            req.form.values[`awerb-${e.id}`] = `${req.body[`awerb-${e.id}-year`]}-${req.body[`awerb-${e.id}-month`]}-${req.body[`awerb-${e.id}-day`]}`;
          });
        }
        next();
      },
      saveValues: (req, res, next) => {
        if (req.processAwerbDates && req.form.values['awerb-exempt'] !== 'yes') {
          const primaryEstablishment = req.project.establishment;
          req.session.form[req.model.id].values['awerb-dates'] = req.awerbEstablishments.map(e => {
            return { ...pick(e, 'id', 'name'), date: moment(req.form.values[`awerb-${e.id}`], 'YYYY-MM-DD').format('YYYY-MM-DD'), primary: e.id === primaryEstablishment.id };
          });
        }
        next();
      },
      locals: (req, res, next) => {
        // map the error content to the per-establishment date fields
        req.awerbEstablishments.forEach(e => {
          set(res.locals, `static.content.errors.awerb-${e.id}`, content.errors['awerb-dates']);
        });
        set(res.locals, 'static.content.buttons.submit', get(res.locals, `static.content.buttons.submit.${req.version.type}`));
        next();
      }
    })
  );

  app.post('/', (req, res, next) => {
    const values = req.session.form[req.model.id].values;

    const json = {
      meta: {
        ...values,
        version: req.version.id
      }
    };

    if (res.locals.static.canEndorse) {
      json.meta.declaration = content.declaration.content;
    }

    Promise.resolve()
      .then(() => req.api(`/establishments/${req.establishmentId}/projects/${req.projectId}/grant`, { method: 'POST', json }))
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('projectVersion.update', { suffix: 'success' }));
      })
      .catch(next);
  });

  app.use((req, res) => res.sendResponse());

  return app;
};
