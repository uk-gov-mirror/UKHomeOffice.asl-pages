const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const { submit } = require('../middleware');
const schema = require('./schema');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use(form({ schema }));

  app.post('/', submit());

  return app;
};
