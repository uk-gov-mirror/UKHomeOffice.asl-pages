// const { set } = require('lodash');
const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');
// const { crumbs } = require('@asl/service/ui/middleware');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({ schema }));

  // app.use(crumbs([
  //   { href: '{{{static.urls.profile.}}}', label: res.locals.static.establishment.name },
  //   { href: '{{{static.urls.profile.list}}}', label: '{{static.content.pages.profile.list}}' },
  //   { href: '{{{static.urls.profile.}}}', label: res.locals.static.profile.name },
  //   '{{static.content.pages.profile.permission}}'
  // ]));

  app.post('/', (req, res, next) => {
    const values = {
      role: req.session.form[req.model.id].values.permission,
      establishmentId: res.locals.static.establishmentId,
      profileId: res.locals.static.profileId
    };

    const opts = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };

    return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/permission`, opts)
      .then(() => next())
      .catch(next);
  });

  return app;
};
