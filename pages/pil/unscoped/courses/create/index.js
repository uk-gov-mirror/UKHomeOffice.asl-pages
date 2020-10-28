const { page } = require('@asl/service/ui');
const update = require('../routers/update');
const { buildModel } = require('../../../../../lib/utils');
const confirm = require('./routers/confirm');
const schema = require('../schema/update');

module.exports = () => {
  const app = page({
    root: __dirname,
    paths: ['/confirm']
  });

  app.use((req, res, next) => {
    res.locals.pageTitle = `${res.locals.static.content.title} - ${req.establishment.name}`;
    next();
  });

  app.use((req, res, next) => {
    req.model = {
      id: 'new-training-course',
      ...buildModel(schema)
    };
    next();
  });

  app.use(update());

  app.post('/', (req, res, next) => {
    res.redirect(`${req.buildRoute('pils.courses.create')}/confirm`);
  });

  app.use('/confirm', confirm());

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
