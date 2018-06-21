const { Router } = require('express');
const form = require('./form');
const confirm = require('./confirm');
const success = require('./success');

module.exports = ({ model, schema, formSettings, confirmSettings, successSettings }) => {
  const app = Router();

  app.use('/', form({ model, schema, ...formSettings }));

  app.post('/', (req, res, next) => {
    return res.redirect(`${req.baseUrl}/confirm`);
  });

  app.use('/confirm', confirm({ model, schema, ...confirmSettings }));

  app.post('/confirm', (req, res, next) => {
    return res.redirect(req.originalUrl.replace(/\/confirm/, '/success'));
  });

  app.use('/success', success({ model, ...successSettings }));

  return app;
};
