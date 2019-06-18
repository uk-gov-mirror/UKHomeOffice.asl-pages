const { omit } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const schema = require('./schema');
const confirm = require('./routers/confirm');
const success = require('../../common/routers/success');
const { groupFlags, ungroupFlags } = require('../../establishment/formatters/flag-grouping');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use((req, res, next) => {
    req.breadcrumb('establishment.update');
    req.model = groupFlags(req.establishment);

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
      if (!Array.isArray(req.body.authorisations)) {
        req.form.values.authorisations = req.body.authorisations ? [req.body.authorisations] : [];
      }
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

    const params = {
      data: omit(values, ['licences', 'authorisations', 'comments']),
      meta: {
        comments
      }
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
