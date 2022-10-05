const { get, pick } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const success = require('../../success');
const schema = require('./schema');
const content = require('./content');
const { populateNamedPeople } = require('../../common/middleware');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/success']
  });

  app.use((req, res, next) => {
    req.model = {};
    req.model.id = `${req.establishment.id}-grant`;
    next();
  });

  app.get('/', populateNamedPeople);

  app.use(form({
    schema,
    requiresDeclaration: req => true
  }));

  app.post('/', (req, res, next) => {
    const opts = {
      method: 'PUT',
      json: {
        data: {},
        meta: {
          ...pick(req.session.form[req.model.id].values, 'comment'),
          declaration: content.fields.declaration.label
        }
      }
    };

    return req.api(`/establishment/${req.establishmentId}/grant`, opts)
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('establishment.apply', { suffix: 'success' }));
      })
      .catch(next);
  });

  app.get('/success', success());

  return app;
};
