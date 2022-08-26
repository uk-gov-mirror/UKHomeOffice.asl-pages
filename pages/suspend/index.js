const { page } = require('@asl/service/ui');
const update = require('./routers/update');
const confirm = require('./routers/confirm');
const success = require('../success');
const { get } = require('lodash');

module.exports = ({ modelType, action }) => () => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success']
  });

  const getLicenceHolder = ({ req, modelType }) => {
    switch (modelType) {
      case 'pil': return req.profile;
      case 'project': return get(req, 'model.licenceHolder');
      case 'establishment': return get(req, 'establishment.pelh') || get(req, 'establishment.nprc');
    }
  };

  app.use((req, res, next) => {
    res.locals.static.modelType = modelType;
    res.locals.static.action = action;
    res.locals.static.licenceHolder = getLicenceHolder({ req, modelType });
    next();
  });

  app.use('/', update({ modelType, action }));
  app.use('/confirm', confirm({ modelType, action }));
  app.use('/success', success());

  return app;
};
