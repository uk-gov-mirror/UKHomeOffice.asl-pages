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
    next();
  });

  app.use(content);
  app.use('/public', assets);

  const pages = getPages();

  Object.keys(pages).forEach(page => {
    console.log(`Mounting ${page}`);
    app.use(`/${page}`, pages[page]);
  });

  return withuser(app);
};
