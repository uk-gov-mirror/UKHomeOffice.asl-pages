const Tokens = require('csrf');

const checkSession = (req, res, next) => {
  if (req.session && req.session.form && req.session.form[req.model.id]) {
    return next();
  }
  const err = new Error('Form session not set');
  err.code = 500;
  return next(err);
};

const generateSecret = (req, res, next) => {
  const tokens = new Tokens();
  tokens.secret((err, secret) => {
    if (err) {
      return next(err);
    }
    req.csrfToken = tokens.create(secret);
    req.session.form[req.model.id].csrfToken = req.csrfToken;
    return next();
  });
};

const checkSecret = (req, res, next) => {
  if (req.body._csrf && req.body._csrf === req.session.form[req.model.id].csrfToken) {
    return next();
  }
  return next({ validation: { form: 'csrf' } });
};

module.exports = {
  generateSecret: [checkSession, generateSecret],
  checkSecret: [checkSession, checkSecret]
};
