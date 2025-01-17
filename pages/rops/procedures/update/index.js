const { page } = require('@asl/service/ui');
const { mapKeys } = require('lodash');
const update = require('../routers/update');

function getValues(req, res, next) {
  const speciesSubFields = [
    'reuse',
    'placesOfBirth',
    'nhpsOrigin',
    'nhpsGeneration',
    'nhpsColonyStatus'
  ];
  const severitySubFields = [
    'severityNum',
    'severityHoNote',
    'severityPersonalNote'
  ];

  req.form.values = mapKeys(req.form.values, (value, key) => {
    if (speciesSubFields.includes(key)) {
      return `${req.form.values.species}-${key}`;
    }
    if (severitySubFields.includes(key)) {
      return `${req.form.values.severity}-${key}`;
    }
    return key;
  });

  next();
}

module.exports = () => {
  const app = page({ root: __dirname });

  app.use((req, res, next) => {
    req.model = req.procedure;
    next();
  });

  app.use(update({ getValues, process }));

  app.post('/', (req, res, next) => {
    const values = mapKeys(req.form.values, (val, key) => {
      if (key.includes('-')) {
        // get key without prefix
        return key.substring(key.lastIndexOf('-') + 1);
      }
      return key;
    });

    const params = {
      method: 'PUT',
      json: { data: values }
    };
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}/procedure/${req.procedureId}`, params)
      .then(() => {
        delete req.session.form[req.model.id];
        res.redirect(req.buildRoute('rops.procedures'));
      })
      .catch(next);
  });

  app.post('/delete', (req, res, next) => {
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}/procedure/${req.procedureId}`, { method: 'DELETE' })
      .then(() => {
        res.redirect(req.buildRoute('rops.procedures'));
      })
      .catch(next);
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
