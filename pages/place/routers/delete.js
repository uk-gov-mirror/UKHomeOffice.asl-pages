const { Router } = require('express');
const bodyParser = require('body-parser');

module.exports = () => {
  const app = Router();

  const _configure = (req, res, next) => {
    req.form = {};
    req.model = req.model || {};
    req.session.form = req.session.form || {};
    return next();
  };

  const _checkDelete = (req, res, next) => {
    if (req.body.delete) {
      req.form.delete = true;
      return next();
    }
    return next(new Error('Something went wrong'));
  };

  const _saveValues = (req, res, next) => {
    req.session.form[req.model.id] = req.form;
    return next();
  };

  const _checkQuery = (req, res, next) => {
    if (req.query.cancel) {
      return res.redirect('/');
    }
    return next();
  };

  app.post('/',
    bodyParser.urlencoded({ extended: false }),
    _configure,
    _checkDelete,
    _saveValues
  );

  app.get('/',
    _configure,
    _checkQuery
  );

  return app;
};
