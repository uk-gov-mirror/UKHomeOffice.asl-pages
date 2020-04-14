const { stringify } = require('qs');
const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const getSchema = require('./schema');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use((req, res, next) => {
    req.model = {
      id: `${req.project.id}-add-user`
    };
    const query = {
      filters: {
        roles: ['holc']
      }
    };
    res.locals.static.profilesHolcFiltered = `${req.buildRoute('profile.list')}?${stringify(query)}`;
    next();
  });

  app.use(form({
    configure: (req, res, next) => {
      req.api(`/establishment/${req.establishmentId}/profiles`, { query: { limit: 'all' } })
        .then(({ json: { data } }) => {
          const profiles = data.filter(profile => !req.project.collaborators.map(p => p.id).includes(profile.id));
          req.form.schema = getSchema(profiles);
        })
        .then(() => next())
        .catch(next);
    }
  }));

  app.post('/', (req, res, next) => {
    const profileId = req.form.values.profile;
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/collaborators/${profileId}`, { method: 'POST' })
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    const id = req.model.id;
    delete req.session.form[id];

    const name = get(req.form, 'schema.profile.options', []).find(p => p.value === req.form.values.profile).label;

    req.notification({ key: 'success', name });
    res.redirect(req.buildRoute('project.addUser'));
  });

  return app;
};
