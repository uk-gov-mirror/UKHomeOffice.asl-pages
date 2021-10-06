const { page } = require('@asl/service/ui');
const { get } = require('lodash');
const endorse = require('./routers/endorse');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.model = req.version || req.project;
    next();
  });

  app.use(endorse());

  app.post('/', (req, res, next) => {
    const { values, meta } = req.session.form[req.model.id];

    const json = {
      data: values,
      meta: {
        ...meta,
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

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
