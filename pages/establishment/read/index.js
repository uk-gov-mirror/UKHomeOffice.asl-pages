const { v4: uuid } = require('uuid');
const moment = require('moment');
const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { form, relatedTasks } = require('../../common/routers');
const { enforcementFlags } = require('../../common/middleware');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    res.locals.static.currentPath = req.originalUrl;
    req.model = req.establishment;
    const reminder = get(req, 'establishment.reminders[0]');

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

  app.get('/', (req, res, next) => {
    res.enforcementModel = req.establishment;
    next();
  }, enforcementFlags);

  app.get('/', relatedTasks(req => {
    return {
      model: 'establishment',
      modelId: req.model.id
    };
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

    req.api(`/establishment/${req.establishmentId}/conditions`, params)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    req.notification({
      key: req.user.profile.asruLicensing ? 'conditions-updated' : 'update-requested'
    });
    delete req.session.form[req.model.id];
    res.redirect(req.buildRoute('establishment.read'));
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
