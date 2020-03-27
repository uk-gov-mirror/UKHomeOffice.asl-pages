const { page } = require('@asl/service/ui');
const { get } = require('lodash');
const { UnauthorisedError } = require('@asl/service/errors');
const { form, success } = require('../../common/routers');
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

  app.use(form({ schema }));

  app.post('/', (req, res, next) => {
    const { comments } = req.form.values;
    const params = {
      method: 'PUT',
      json: { meta: { comments } }
    };
    req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${req.pilId}/review`, params)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res) => {
    res.redirect(`${req.buildRoute('pil.review')}/success`);
  });

  app.use('/success', success({
    licence: 'pil',
    type: 'review',
    getStatus: req => {
      const status = get(req.pil, 'openTasks[0].status');
      return status || 'resolved';
    }
  }));

  return app;
};
