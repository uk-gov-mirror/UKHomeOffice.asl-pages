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
        conditionalReveal: true
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
    return res.redirect(req.originalUrl.replace(/\/confirm/, '/success'));
  });

  app.use('/success', success({ model: 'place' }));

  return app;
};
