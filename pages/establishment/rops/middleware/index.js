const { Router } = require('express');
const bodyParser = require('body-parser');

function redirectOnPost({ target }) {
  const app = Router({ mergeParams: true });

  app.post('/', bodyParser.urlencoded({ extended: false }), (req, res, next) => {
    const { year } = req.body;
    res.redirect(req.buildRoute(target, { year }));
  });

  return app;
}

module.exports = {
  redirectOnPost
};
