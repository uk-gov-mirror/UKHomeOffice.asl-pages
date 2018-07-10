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
      restrictions: {
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
    return res.redirect(`${req.baseUrl}/confirm`);
  });

  app.use('/confirm', confirm());

  app.post('/confirm', (req, res, next) => {
    const values = req.session.form[req.model.id].values;
    const opts = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };
    return req.api(`/establishment/${req.establishment}/place/${req.model.id}`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/confirm', (req, res, next) => {
    return res.redirect(req.originalUrl.replace(/\/confirm/, '/success'));
  });

  app.use('/success', success({ model: 'place' }));

  return app;
};
