const { pick, uniq } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const schema = require('./schema');
const confirm = require('./routers/confirm');
const success = require('../../common/routers/success');
const { groupFlags, ungroupFlags } = require('../../establishment/formatters/flag-grouping');

const fieldsToAuthorisations = params => {
  return Object.keys(params).reduce((authorisations, fieldName) => {
    const matched = fieldName.match(/^authorisation-(killing|rehomes)-(method|description)-([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/);

    if (!matched || !params[fieldName]) {
      return authorisations;
    }

    const [, authType, authInfo, id] = matched;

    let authorisation = authorisations.find(a => a.id === id);

    if (!authorisation) {
      authorisation = { id };
      authorisations.push(authorisation);
    }

    authorisation.type = authType;

    if (authInfo === 'method') {
      authorisation.method = params[fieldName];
    }

    if (authInfo === 'description') {
      authorisation.description = params[fieldName];
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

      if (!Array.isArray(req.body.authorisationTypes)) {
        req.form.values.authorisationTypes = req.body.authorisationTypes ? [req.body.authorisationTypes] : [];
      }

      // if the checkbox for the auth type is unticked, remove those authorisations
      req.form.values.authorisations = fieldsToAuthorisations(req.body).filter(authorisation => {
        return req.form.values.authorisationTypes && req.form.values.authorisationTypes.includes(authorisation.type);
      });

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
