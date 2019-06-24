const { pick, uniq } = require('lodash');
const isUUID = require('uuid-validate');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const schema = require('./schema');
const confirm = require('./routers/confirm');
const success = require('../../common/routers/success');
const { groupFlags, ungroupFlags } = require('../../establishment/formatters/flag-grouping');

const fieldsToAuthorisations = params => {
  return Object.keys(params).reduce((authorisations, fieldName) => {
    if (params[fieldName] && /^authorisation-/.test(fieldName)) {
      const id = fieldName.slice(-36); // get the uuid

      if (!isUUID(id)) {
        return authorisations;
      }

      let authorisation = authorisations.find(a => a.id === id);

      if (!authorisation) {
        authorisation = { id };
        authorisations.push(authorisation);
      }

      authorisation.type = /killing/.test(fieldName) ? 'killing' : 'rehomes';

      if (/method/.test(fieldName)) {
        authorisation.method = params[fieldName];
      }

      if (/description/.test(fieldName)) {
        authorisation.description = params[fieldName];
      }
    }
    return authorisations;
  }, []);
};

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use((req, res, next) => {
    req.breadcrumb('establishment.update');
    req.model = groupFlags(req.establishment);

    req.model.authorisationTypes = uniq(
      req.model.authorisations.map(authorisation => authorisation.type)
    );

    next();
  });

  app.use(form({
    schema: Object.assign({}, schema, {
      comments: {
        inputType: 'textarea',
        validate: ['required']
      }
    }),
    process: (req, res, next) => {
      if (!Array.isArray(req.body.licences)) {
        req.form.values.licences = req.body.licences ? [req.body.licences] : [];
      }

      req.form.values.authorisations = fieldsToAuthorisations(req.body);

      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('establishment.update.confirm'));
  });

  app.use('/confirm', confirm());

  app.post('/confirm', (req, res, next) => {
    let values = ungroupFlags(req.session.form[req.model.id].values);
    const { comments } = values;

    values.authorisations = values.authorisations.map(authorisation => ({
      ...authorisation,
      establishmentId: req.establishmentId
    }));

    const params = {
      data: pick(values, ['name', 'address', 'procedure', 'breeding', 'supplying', 'authorisations']),
      meta: { comments }
    };

    const opts = {
      method: 'PUT',
      json: params
    };

    return req.api(`/establishment/${req.establishmentId}`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/confirm', (req, res, next) => {
    return res.redirect(req.buildRoute('establishment.update.success'));
  });

  app.use('/success', success({
    model: 'establishment',
    licence: 'pel',
    type: 'amendment',
    status: 'resubmitted'
  }));

  return app;
};
