const { page } = require('@asl/service/ui');
const { mapKeys, pickBy } = require('lodash');
const update = require('../routers/update');
const content = require('./content');

function format(req) {
  const vals = req.form.values;
  return vals.severity.map(s => {
    return {
      severity: s,
      severityNum: vals[`${s}-severityNum`],
      severityHoNote: vals[`${s}-severityHoNote`],
      severityPersonalNote: vals[`${s}-severityPersonalNote`],
      ...mapKeys(pickBy(vals, (v, k) => !k.includes('severity')), (val, key) => {
        if (key.includes('-')) {
          // get key without prefix
          return key.substring(key.lastIndexOf('-') + 1);
        }
        return key;
      })
    };
  });
}

module.exports = () => {
  const app = page({ root: __dirname });

  app.use((req, res, next) => {
    req.model = { id: 'new-procedure' };
    next();
  });

  app.use(update({ addMultiple: true }));

  app.post('/', (req, res, next) => {
    const values = format(req);
    const numAdded = values.length;
    let severities = values.map(s => content.fields.severity.options[s.severity]);

    if (severities.length > 1) {
      const last = severities.pop();
      severities = `${severities.join(', ')} and ${last}`;
    }

    if (values.specialTechniqueUsed === false) {
      values.specialTechnique = null;
    }

    const params = {
      method: 'POST',
      json: { data: values }
    };
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}/procedures`, params)
      .then(() => {
        delete req.session.form[req.model.id];
        req.notification({ key: 'added', numAdded, severities, plural: numAdded > 1 });
        res.redirect(req.buildRoute('rops.procedures'));
      })
      .catch(next);
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
