const { Router } = require('express');
const { pick, merge } = require('lodash');
const form = require('../../../common/routers/form');
const schema = require('../schema');
const declarationsSchema = require('../schema/declarations');
const { updateDataFromTask, redirectToTaskIfOpen } = require('../../../common/middleware');
const { ungroupFlags } = require('../helpers');

module.exports = () => {

  const sendData = (req, params = {}) => {
    const values = ungroupFlags(req.session.form[req.model.id].values);

    values.authorisations = values.authorisations.map(authorisation => ({
      ...authorisation,
      establishmentId: req.establishmentId
    }));

    const opts = {
      method: 'PUT',
      json: merge({
        data: pick(values, ['name', 'address', 'procedure', 'breeding', 'supplying', 'authorisations']),
        meta: { comments: values.comments }
      }, params)
    };

    return req.api(`/establishment/${req.establishmentId}`, opts);
  };

  const app = Router();

  app.post('/', updateDataFromTask(sendData));

  app.use((req, res, next) => {
    const requiresDeclaration = !req.user.profile.asruUser;

    form(Object.assign({
      model: 'establishment',
      schema: requiresDeclaration ? declarationsSchema : {},
      saveValues: (req, res, next) => {
        delete req.session.form[req.model.id].values.declarations;
        next();
      },
      locals: (req, res, next) => {
        Object.assign(res.locals, { model: req.model });
        Object.assign(res.locals.static, {
          schema: Object.assign({}, schema, declarationsSchema),
          values: req.session.form[req.model.id].values,
          requiresDeclaration
        });
        next();
      },
      checkSession: (req, res, next) => {
        if (req.session.form && req.session.form[req.model.id]) {
          return next();
        }
        return res.redirect(req.buildRoute('establishment.update'));
      },
      editAnswers: (req, res, next) => {
        delete req.session.form[req.model.id].validationErrors;
        return res.redirect(req.buildRoute('establishment.update'));
      },
      cancelEdit: (req, res, next) => {
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('establishment.read'));
      }
    }))(req, res, next);
  });

  app.post('/', redirectToTaskIfOpen());

  app.post('/', (req, res, next) => {
    sendData(req)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    res.redirect(req.buildRoute('establishment.update', { suffix: 'success' }));
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
