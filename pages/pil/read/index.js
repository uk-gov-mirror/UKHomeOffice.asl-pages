const { v4: uuid } = require('uuid');
const moment = require('moment');
const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { NotFoundError } = require('@asl/service/errors');
const { form, relatedTasks } = require('../../common/routers');
const { hydrate, enforcementFlags } = require('../../common/middleware');
const schema = require('./schema/form');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.get('/', hydrate());

  app.get('/', (req, res, next) => {
    if (!req.model) {
      return next(new NotFoundError());
    }
    if (['pending', 'inactive'].includes(req.model.status)) {
      return res.redirect(req.buildRoute('pil.update', { pilId: req.pil.id }));
    }
    next();
  });

  app.get('/', (req, res, next) => {
    req.breadcrumb('pil.read');
    if (req.pil.reviewDue && req.pil.status === 'active') {
      res.locals.static.pilReviewRequired = true;
      res.locals.static.reviewUrl = req.buildRoute('pil.review', { pilId: req.pil.id });
    }
    next();
  });

  app.get('/', (req, res, next) => {
    const params = {
      pilId: req.pil.id,
      profileId: req.profileId,
      establishment: req.establishmentId
    };
    Promise.all([
      req.user.can('pil.create', params),
      req.user.can('pil.update', params),
      req.user.can('pil.pdf', params)
    ])
      .then(([canApply, canUpdate, canDownload]) => {
        res.locals.static.canApply = !req.pil.id && canApply;
        res.locals.static.canUpdate = canUpdate;
        res.locals.static.canDownload = canDownload;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    if (req.model.status === 'revoked' && res.locals.static.canUpdate) {
      // users can't reactivate a PIL if they're no longer at the establishment that holds it
      res.locals.static.canReapply = !!req.profile.establishments.find(e => e.id === req.model.establishmentId);
    }
    res.locals.static.pil = req.model;
    res.locals.static.profile = req.profile;
    res.locals.static.currentPath = req.originalUrl;
    res.locals.static.isLicenceHolder = req.user.profile.id === req.profileId;
    next();
  });

  app.get('/', relatedTasks(req => {
    return {
      model: 'pil',
      modelId: req.pil.id,
      establishmentId: req.establishmentId
    };
  }));

  app.use((req, res, next) => {
    const reminder = get(req, 'pil.reminders[0]');
    if (reminder) {
      req.model.setReminder = 'yes';
      req.model.deadline = reminder.deadline;
      req.model.reminderId = reminder.id;
    }
    next();
  });

  app.use(form({
    schema,
    process: (req, res, next) => {
      const day = req.body['deadline-day'];
      const month = req.body['deadline-month'];
      const year = req.body['deadline-year'];

      Object.assign(req.form.values, {
        deadline: `${year}-${month}-${day}`
      });

      next();
    },
    saveValues: (req, res, next) => {
      req.session.form[req.model.id].values.deadline = req.form.values.setReminder
        ? moment(req.form.values.deadline, 'YYYY-MM-DD').format('YYYY-MM-DD')
        : undefined;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const { conditions, setReminder, deadline } = req.session.form[req.model.id].values;

    let reminder = req.model.reminderId
      ? { id: req.model.reminderId, deadline: deadline || req.model.deadline }
      : { id: uuid(), deadline };

    if (!setReminder) {
      if (req.model.reminderId) {
        reminder.deleted = new Date().toISOString();
      } else {
        reminder = undefined;
      }
    }

    const params = {
      method: 'PUT',
      json: {
        data: { conditions, reminder }
      }
    };

    req.api(`/profile/${req.profileId}/pil/${req.pil.id}/conditions`, params)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    const id = req.model.id;
    req.notification({
      key: req.user.profile.asruLicensing ? 'conditions-updated' : 'update-requested'
    });
    delete req.session.form[id];
    res.redirect(req.buildRoute('pil.read'));
  });

  // redirect old /pil/:pilId links
  app.get('/:pilId', (req, res, next) => {
    if (req.params.pilId === 'create') {
      return next('route');
    }
    res.redirect(req.buildRoute('pil.read'));
  });

  app.get('/', (req, res, next) => {
    res.enforcementModel = req.model;
    next();
  }, enforcementFlags);

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
