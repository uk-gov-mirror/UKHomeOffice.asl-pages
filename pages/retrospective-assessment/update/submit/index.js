const moment = require('moment');
const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../../common/routers');
const getSchema = require('./schema');
const content = require('./content');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.model = req.retrospectiveAssessment;
    next();
  });

  app.use((req, res, next) => {
    const params = {
      projectId: req.project.id,
      establishmentId: req.establishmentId
    };
    req.user.can('project.endorse', params)
      .then(canEndorse => {
        req.canEndorse = canEndorse;
      })
      .then(() => next())
      .catch(next);
  });

  app.use((req, res, next) => {
    const task = get(req.project, 'openTasks', []).find(task => task.data.action === 'grant-ra');
    if (!task) {
      return next();
    }
    req.awerbCompleted = !!get(task, 'data.meta[\'ra-awerb-date\']');
    next();
  });

  app.use(form({
    configure: (req, res, next) => {
      req.form.schema = getSchema(req.canEndorse, req.awerbCompleted);
      next();
    },
    process: (req, res, next) => {
      if (!req.canEndorse) {
        return next();
      }
      if (!req.body['ra-awerb-date-day'] || req.awerbCompleted) {
        return next();
      }
      const day = req.body['ra-awerb-date-day'];
      const month = req.body['ra-awerb-date-month'];
      const year = req.body['ra-awerb-date-year'];

      Object.assign(req.form.values, {
        'ra-awerb-date': `${year}-${month}-${day}`
      });
      next();
    },
    saveValues: (req, res, next) => {
      if (!req.body['ra-awerb-date-day'] || req.awerbCompleted || !req.canEndorse) {
        return next();
      }
      req.session.form[req.model.id].values['ra-awerb-date'] = moment(req.form.values['ra-awerb-date'], 'YYYY-MM-DD').format('YYYY-MM-DD');
      next();
    },
    locals: (req, res, next) => {
      res.locals.static.awerbCompleted = req.awerbCompleted;
      res.locals.static.project = req.project;
      res.locals.static.canEndorse = req.canEndorse;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const values = req.form.values;
    const task = get(req.project, 'openTasks', []).find(task => task.data.action === 'grant-ra');
    const includeDeclaration = req.canEndorse && !get(task, 'data.meta.declaration');
    const json = {
      meta: {
        ...values,
        raVersion: req.retrospectiveAssessment.id
      }
    };

    if (includeDeclaration) {
      json.meta.declaration = content.declaration;
    }

    Promise.resolve()
      .then(() => req.api(`/establishments/${req.establishmentId}/projects/${req.projectId}/grant-ra`, { method: 'POST', json }))
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('retrospectiveAssessment.update', { suffix: 'success' }));
      })
      .catch(next);
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
