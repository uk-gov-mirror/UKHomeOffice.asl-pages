const { set } = require('lodash');
const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { crumbs } = require('@asl/service/ui/middleware');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({ schema }));

  app.use(crumbs([
    { href: '{{{static.urls.profile.list}}}', label: '{{static.content.pages.profile.list}}' },
    '{{static.content.pages.profile.invite}}'
  ]));

  app.use('/', (req, res, next) => {
    const establishment = req.user.profile.establishments.find(e => e.id === req.establishment);
    res.locals.static.establishment = establishment;
    next();
  });

  app.post('/', (req, res, next) => {
    const values = req.session.form[req.model.id].values;
    const opts = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };
    return req.api(`/establishment/${req.establishment}/profile`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    const id = req.model.id;
    set(req.session, 'notifications', [{
      type: 'success',
      props: {
        email: req.session.form[id].values.email
      }
    }]);
    delete req.session.form[id];
    return res.redirect(req.originalUrl.replace(/\/invite/, ''));
  });

  return app;
};
