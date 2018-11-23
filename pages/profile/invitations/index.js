const page = require('../../../lib/page');
const datatable = require('../../common/routers/datatable');
const { crumbs } = require('@asl/service/ui/middleware');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    const href = req.buildRoute('profile.list');
    crumbs([
      {
        href,
        label: '{{static.content.pages.profile.list}}'
      },
      '{{static.content.pages.profile.invitations}}'
    ])(req, res, next);
  });

  app.use(datatable({
    getApiPath: (req, res, next) => {
      req.datatable.apiPath = `/establishment/${req.establishmentId}/invitations`;
      next();
    }
  })({ schema }));

  return app;
};
