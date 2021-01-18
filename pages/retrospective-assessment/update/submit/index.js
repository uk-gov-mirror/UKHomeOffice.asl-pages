const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../../common/routers');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.model = req.retrospectiveAssessment;
    next();
  });

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    const values = req.form.values;
    const json = {
      meta: {
        ...values,
        raVersion: req.retrospectiveAssessment.id
      }
    };

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
