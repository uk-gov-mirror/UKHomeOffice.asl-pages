const { omit } = require('lodash');

const page = require('../../../lib/page');
const confirm = require('../routers/confirm');
const amend = require('../routers/amend');
const success = require('../../common/routers/success');
const { schema } = require('../schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use('/', amend({
    schema: Object.assign({}, schema, {
      notes: {
        inputType: 'text',
        editable: false
      },
      changesToRestrictions: {
        inputType: 'textarea',
        conditionalReveal: true,
        validate: ['required']
      },
      comments: {
        inputType: 'textarea'
      }
    })
  }));

  app.post('/', (req, res, next) => {
    const { id } = req.model;
    return res.redirect(req.buildRoute('place.update.confirm', {id}));
  });

  app.use('/confirm', confirm());

  app.post('/confirm', (req, res, next) => {
    const values = omit(req.session.form[req.model.id].values, ['declaration', 'conditional-reveal-changesToRestrictions']);
    const {
      changesToRestrictions,
      comments
    } = values;
    const params = {
      data: omit(values, ['changesToRestrictions', 'comments']),
      meta: {
        changesToRestrictions,
        comments
      }
    };

    const opts = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(params)
    };
    return req.api(`/establishment/${req.establishmentId}/place/${req.model.id}`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/confirm', (req, res, next) => {
    const { id } = req.model;
    return res.redirect(req.buildRoute('place.update.success', {id}));
  });

  app.use('/success', success({ model: 'place' }));

  return app;
};
