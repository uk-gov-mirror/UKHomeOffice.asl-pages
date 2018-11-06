const ui = require('@asl/service/ui');
const withuser = require('./withuser');
const session = require('express-session');
const fixtures = require('../fixtures');

const getPages = require('../helpers/pages');

const urls = {
  ...require('../pages'),
  ...require('../urls')
};

const { views, content, assets } = require('../../../');

module.exports = () => {
  const app = ui({
    auth: false,
    log: { level: 'silent' },
    views,
    urls
  });

  app.use(session({
    secret: 'apple sauce',
    resave: false,
    saveUnitialized: false
  }));

  app.use((req, res, next) => {
    req.api = fixtures;
    next();
  });

  app.use(content);
  app.use('/public', assets);

  const pages = getPages();

  Object.keys(pages).forEach(page => {
    app.use(`/${page}`, pages[page].middleware);
    app.use(`/${page}`, pages[page].router);
  });

  return withuser(app);
};
