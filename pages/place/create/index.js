const page = require('../../../lib/page');
const amend = require('../routers/amend');
const confirm = require('../routers/confirm');
const success = require('../../common/routers/success');
const { schema } = require('../schema');
const { getNacwoById } = require('../../common/helpers');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use('/', amend({
    schema: Object.assign({}, schema, {
      comments: {
        inputType: 'textarea'
      }
    })
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(`${req.baseUrl}/confirm`);
  });

  app.use('/confirm', confirm());

  app.use('/confirm', (req, res, next) => {
    return getNacwoById(req, req.form.values.nacwo)
      .then(nacwo => {
        res.locals.model = {
          ...req.form.values,
          nacwo
        };
      })
      .then(() => next())
      .catch(next);
  });

  app.post('/confirm', (req, res, next) => {
    return res.redirect(req.originalUrl.replace(/\/confirm/, '/success'));
  });

  app.use('/success', success({ model: 'place' }));

  return app;
};
