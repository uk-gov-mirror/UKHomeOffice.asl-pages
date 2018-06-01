const { merge } = require('lodash');
const page = require('../../lib/page');
const pageContent = require('./content');
const routers = require('./routers');

module.exports = ({ content } = {}) => {
  const app = page({
    root: __dirname,
    reducers: [
      'establishment',
      'item',
      'schema',
      'diff'
    ],
    pageContent: merge({}, pageContent, content)
  });

  app.use((req, res, next) => {
    if (req.place === 'new') {
      // do the things for "new"
    }
    next();
  });

  app.use('/edit', routers.edit());
  app.use('/delete', routers.delete());
  app.use('/', routers.view());

  return app;
};
