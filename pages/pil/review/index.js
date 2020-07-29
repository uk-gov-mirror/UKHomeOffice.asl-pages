const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { UnauthorisedError } = require('@asl/service/errors');
const { form } = require('../../common/routers');
const success = require('../../success');
const schema = require('./schema');

module.exports = () => {
  const app = page({
    root: __dirname,
    paths: ['/success']
  });

  app.get('/', (req, res, next) => {
    const params = { ...req.params, establishment: req.establishmentId };
    Promise.all([
      req.user.can('pil.update', params),
      req.user.can('pil.review', params)
    ])
      .then(([canUpdate, canReview]) => {
        if (!canUpdate && !canReview) {
          return next(new UnauthorisedError());
        }
        res.locals.static.canReview = canReview;
        if (canReview) {
          // change the button text if the user can complete the review without approval
          res.locals.static.content.buttons.submit = res.locals.static.content.buttons.canReviewSubmit;
        }
      })
      .then(() => next())
      .catch(next);
  });

  app.use((req, res, next) => {
    req.model.id = `${req.pil.id}-review`;
    next();
  });

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    const { comments } = req.form.values;
    const params = {
      method: 'PUT',
      json: { meta: { comments } }
    };
    req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${req.pilId}/review`, params)
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('pil.review', { suffix: 'success' }));
      })
      .catch(next);
  });

  app.get('/success', success());

  return app;
};
