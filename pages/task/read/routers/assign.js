const { Router } = require('express');
const bodyParser = require('body-parser');
const { UnauthorisedError } = require('@asl/service/errors');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    if (!req.user.profile.asruUser) {
      return next(new UnauthorisedError('Only ASRU users can assign tasks'));
    }
    next();
  });

  app.post('/', (req, res, next) => {
    let { assignedTo } = req.body;

    if (!assignedTo) {
      return res.redirect(req.buildRoute('task.read'));
    }

    if (assignedTo === 'Unassigned') {
      assignedTo = null;
    }

    const params = {
      method: 'PUT',
      json: {
        data: {
          profileId: assignedTo
        }
      }
    };

    req.api(`/tasks/${req.taskId}/assign`, params)
      .then(() => {
        req.notification({ key: 'success' });
        res.redirect(req.buildRoute('task.read'));
      })
      .catch(next);
  });

  return app;
};
