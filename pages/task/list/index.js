const { Router } = require('express');
const bodyParser = require('body-parser');

module.exports = () => {
  const app = Router();

  app.get('/', (req, res) => res.redirect(req.buildRoute('dashboard')));

  app.put('/assign', bodyParser.json(), (req, res, next) => {
    let { assignedTo, taskId } = req.body;

    if (!assignedTo || !taskId) {
      return next();
    }

    const params = {
      method: 'PUT',
      json: {
        data: {
          profileId: assignedTo
        }
      }
    };

    req.api(`/tasks/${taskId}/assign`, params)
      .then(response => {
        res.json(response.json);
      })
      .catch(next);
  });

  return app;
};
