const { set } = require('lodash');
const ui = require('@asl/service/ui');
const withuser = require('./withuser');
const fixtures = require('../fixtures');

const getPages = require('../helpers/pages');

const { views, content, assets } = require('../../../');

module.exports = () => {
  const app = ui({
    auth: false,
    log: { level: 'silent' },
    views
  });

  app.use((req, res, next) => {
    req.api = fixtures;
    req.session = {};
    next();
  });

  app.use(content);
  app.use('/public', assets);

  const pages = getPages();

  const urls = Object.keys(pages).reduce((all, path) => {
    const key = path.replace('pages/', '').split('/').join('.');
    return set(all, key, `/${path}`);
  }, {});

  app.use((req, res, next) => {
    set(res.locals, 'static.urls', urls);
    next();
  });

  Object.keys(pages).forEach(page => {
    app.use(`/${page}`, pages[page].middleware);
    app.use(`/${page}`, pages[page].router);
  });

  return withuser(app);
};
