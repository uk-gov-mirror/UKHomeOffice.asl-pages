const { page } = require('@asl/service/ui');
const { form } = require('../../../common/routers');
const schema = require('./schema');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use((req, res, next) => {
    req.model = req.collaborator;
    next();
  });

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    const { role } = req.form.values;
    const params = {
      method: role === 'remove' ? 'DELETE' : 'PUT',
      json: {
        data: { role }
      }
    };
    req.api(`/establishment/${req.establishmentId}/project/${req.project.id}/collaborators/${req.collaborator.profileId}`, params)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    delete req.session.form[req.model.id];
    req.notification({ key: 'success', name: `${req.collaborator.firstName} ${req.collaborator.lastName}` });
    res.redirect(`${req.buildRoute('project.read')}#manageAccess`);
  });

  return app;
};
