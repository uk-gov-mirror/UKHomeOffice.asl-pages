const { Router } = require('express');
const form = require('./form');
const confirm = require('./confirm');
const success = require('./success');

module.exports = ({ schema, formSettings, confirmSettings, successSettings }) => {
  const app = Router();

  app.use('/', form({ schema, ...formSettings }));

  app.post('/', (req, res, next) => {
    return res.redirect(`${req.baseUrl}/confirm`);
  });

  app.use('/confirm', confirm({ schema, ...confirmSettings }));

  app.post('/confirm', (req, res, next) => {
    return res.redirect(req.originalUrl.replace(/\/confirm/, '/success'));
  });

  app.use('/success', success({ ...successSettings }));

  return app;
};
