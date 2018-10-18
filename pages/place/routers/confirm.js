const form = require('../../common/routers/form');
const { getEstablishment, getNacwoById } = require('../../common/helpers');
const { schema } = require('../schema');

module.exports = settings => form(Object.assign({
  model: 'place',
  schema: {
    declaration: { validate: ['required'] }
  },
  locals: (req, res, next) => {
    Object.assign(res.locals, { model: req.model });
    Promise.all([
      getEstablishment(req),
      getNacwoById(req, req.form.values.nacwo)
    ])
      .then(([establishment, nacwo]) => {
        Object.assign(res.locals.static, {
          establishment,
          schema,
          values: {
            ...req.session.form[req.model.id].values,
            nacwo
          }
        });
      })
      .then(() => next())
      .catch(next);
  },
  checkSession: (req, res, next) => {
    if (req.session.form && req.session.form[req.model.id]) {
      return next();
    }
    console.log('14', req.originalUrl.replace(/\/confirm/, ''));
    return res.redirect(req.originalUrl.replace(/\/confirm/, ''));
  },
  cancelEdit: (req, res, next) => {
    return res.redirect(req.listPath);
  }
}, settings));
