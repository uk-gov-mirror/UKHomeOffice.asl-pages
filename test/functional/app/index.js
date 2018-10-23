const { set } = require('lodash');
const ui = require('@asl/service/ui');
const withuser = require('./withuser');
const session = require('express-session');
const fixtures = require('../fixtures');

const getPages = require('../helpers/pages');

const urls = require('../pages');

const { views, content, assets } = require('../../../');

module.exports = () => {
  const app = ui({
    auth: false,
    log: { level: 'silent' },
    views
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

  app.use((req, res, next) => {
    set(res.locals, 'static.urls', { ...urls,
      place: {
        create: {
          create: '/create-place',
          confirm: '/pages/place/create/confirm',
          success: '/pages/place/create/success'
        },
        update: {
          confirm: '/pages/place/an-id/edit/confirm',
          success: '/pages/place/an-id/edit/success'
        }
      }
    });
    next();
  });

  const pages = getPages();

  Object.keys(pages).forEach(page => {
    app.use(`/${page}`, pages[page].middleware);
    app.use(`/${page}`, pages[page].router);
  });

  return withuser(app);
};
