const { Router } = require('express');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.get('/:reminderId/dismiss', (req, res, next) => {
    const reminderId = req.params.reminderId;

    req.api(`/me/reminders/${reminderId}/dismiss`, { method: 'put' })
      .then(response => {
        return res.json({ message: `reminder dismissed` });
      })
      .catch(err => {
        res.status(500);
        return res.json({ message: err.message });
      });
  });

  return app;
};
