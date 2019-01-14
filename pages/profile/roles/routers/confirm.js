const form = require('../../../common/routers/form');
const schema = require('../schema/declarations');

module.exports = settings => form(Object.assign({
  model: 'role-confirm',
  schema,
  locals: (req, res, next) => {
    Object.assign(res.locals, { model: req.model });
    Object.assign(res.locals.static, {
      profile: req.profile,
      values: {
        ...req.session.form[req.model.id].values
      }
    });
    next();
  },
  checkSession: (req, res, next) => {
    if (req.session.form && req.session.form[req.model.id]) {
      return next();
    }
    return res.redirect(req.buildRoute('profile.role.apply'));
  },
  cancelEdit: (req, res, next) => {
    return res.redirect(req.buildRoute('profile.view'));
  }
}, settings));
