const { page } = require('@asl/service/ui');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.post('/', (req, res, next) => {
    const params = {
      method: 'PUT',
      json: {
        meta: {
          version: req.version.id
        }
      }
    };

    return Promise.resolve()
      .then(() => req.api(`/project/${req.projectId}/convert-stub`, params))
      .then(() => {
        req.notification({ key: 'conversionSuccess' });
        return res.redirect(req.buildRoute('project.read'));
      })
      .catch(next);
  });

  app.use((req, res) => res.sendResponse());

  return app;
};
