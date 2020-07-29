const { pick, get, set } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../../common/routers/form');
const getSchema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.version.type = req.project.status === 'active' ? 'amendment' : 'application';
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
        'awerb',
        'ready',
        'authority-pelholder-name',
        'authority-endorsement-date',
        'awerb-review-date',
        'awerb-no-review-reason',
        'comments',
        'comment'
      ]));
    }
    next();
  });

  app.use((req, res, next) => {
    req.model = req.version;
    next();
  });

  app.use(
    form({
      configure: (req, res, next) => {
        // if application has previously been approved then this is a resubmission and we can show the inspector ready question
        const hasAuthority = get(req.project, 'openTasks[0].data.meta.authority') === 'Yes';
        const schema = getSchema(req.version.type, req.user.profile.asruUser, hasAuthority);
        req.form.schema = schema;
        next();
      },
      locals: (req, res, next) => {
        set(res.locals, 'static.content.buttons.submit', get(res.locals, `static.content.buttons.submit.${req.version.type}`));
        next();
      }
    })
  );

  app.post('/', (req, res, next) => {
    const values = req.form.values;
    const json = {
      meta: {
        ...values,
        version: req.version.id
      }
    };
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
