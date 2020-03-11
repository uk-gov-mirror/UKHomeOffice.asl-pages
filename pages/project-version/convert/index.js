const { page } = require('@asl/service/ui');
const success = require('../../common/routers/success');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/success']
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
      .then(() => res.redirect(req.buildRoute('projectVersion.convert', { suffix: 'success' })))
      .catch(next);
  });

  app.get('/success', success({
    licence: 'project',
    status: 'resolved',
    type: 'conversion'
  }));

  app.use((req, res) => res.sendResponse());

  return app;
};
